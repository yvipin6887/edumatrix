import { Repository, FindOptionsWhere, FindManyOptions, ObjectLiteral, ILike, Brackets  } from 'typeorm';
import { Connection, Edge, PageInfo, PaginationArgs, SortInput } from '@edumatrix/shared';

export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
  protected alias = 't';
  protected searchableColumns: string[] = [];
  protected filterParams: any = {};
  protected qb: any;
  protected primaryKey: string = 'id';
  protected sortParams?: SortInput = {field: 'id', order: 'DESC'};

  protected queryBuilder()
  {
    return this.createQueryBuilder(this.alias)
  }
  /**
   * Generic paginate method - works directly with TypeORM
   * Extends Repository so all TypeORM methods are available
   */
  protected async paginate(
    args: PaginationArgs = {},
    filters?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    sort?: SortInput,
    options?: Omit<FindManyOptions<T>, 'where' | 'take' | 'skip'>
  ): Promise<Connection<T>> {
    const first = args.first || 10;
    const after = args.after;
    const last = args.last;
    const before = args.before;
    
    this.filterParams = filters || {};
    this.sortParams = sort || this.sortParams;
    
    // 🔥 Start QueryBuilder
    this.qb = this.queryBuilder();

    /** ======================
     *   📌  APPLY FILTERS
     * ====================== */
    if (filters) {
      this.searchFilter();
      this.applyFilters();
    }

    /** ======================
     *  📌 Pagination Logic
     * ====================== */
    let startIndex = 0;
    let totalCount = await this.qb.getCount();

    // ---------------- FORWARD - first + after ----------------
    if (first && !last) {
      if (after) {
        const afterId = this.decodeCursor(after);
        const condition = this.sortParams.order === 'DESC' ? '<' : '>';
        
        this.qb.andWhere(
          `${this.alias}.${this.primaryKey} ${condition} :cursorValue`,
          { cursorValue: afterId }
        );
      }

      this.qb.take(first);
    }

    // ---------------- BACKWARD - last + before ----------------
    if (last && !first) {
      if (before) {
        const beforeId = this.decodeCursor(before);
        const condition = this.sortParams.order === 'DESC' ? '>' : '<'; // Reverse!
        this.qb.andWhere(
          `${this.alias}.${this.primaryKey} ${condition} :cursorValue`,
          { cursorValue: beforeId }
        );
      }

      this.qb.take(last);
    }

    // Apply Sorting
    this.applySorting();

    console.log(this.qb.getSql(), 'Final QB SQL');

    /** ======================
     *  ⚡ Execute
     * ====================== */
    const items = await this.qb.getMany();
    console.log(items, 'Items');
    // Create edges with cursors
    const edges: Edge<T>[] = items.map(item => ({
      cursor: this.encodeCursor(item[this.primaryKey]),
      node: item,
    }));

    const hasNextPage = edges.length > 0 && (startIndex + edges.length < totalCount);
    const hasPreviousPage = startIndex > 0;

    const pageInfo: PageInfo = {
      hasNextPage,
      hasPreviousPage,
      startCursor: edges.length > 0 ? edges[0].cursor : null,
      endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
    };

    return { edges, pageInfo, totalCount };
  }

  protected searchFilter(): void 
  {
      if (this.filterParams.search && this.filterParams.search.trim()) {
        this.qb.andWhere(
          new Brackets(qb1 => {
            this.searchableColumns.forEach((col, i) => {
              if (i === 0) qb1.where(`${this.alias}.${col} ILIKE :search`);
              else qb1.orWhere(`${this.alias}.${col} ILIKE :search`);
            });
          }),
          { search: `%${this.filterParams.search}%` }
        );
      }
  }

  protected applyFilters(): void
  {
    Object.keys(this.filterParams).forEach((key) => {
      if (this.filterParams[key] && key !== 'search') {
        this.qb.andWhere(`${this.alias}.${key} = :${key}`, { [key]: this.filterParams[key] });
      }
    });
  }

  protected applySorting(): void
  {
    if (this.sortParams && this.sortParams.field) {
      this.qb.orderBy(`${this.alias}.${this.sortParams.field}`, this.sortParams.order || 'DESC');
    } else {
      this.qb.orderBy(`${this.alias}.id`, 'DESC');
    }
  }

  /**
   * Encode cursor to base64
   */
  protected encodeCursor(value: string): string {
    return Buffer.from(`cursor:${value}`).toString('base64');
  }

  /**
   * Decode cursor from base64
   */
  protected decodeCursor(cursor: string): string {
    return Buffer.from(cursor, 'base64')
      .toString('utf-8')
      .replace('cursor:', '');
  }
}