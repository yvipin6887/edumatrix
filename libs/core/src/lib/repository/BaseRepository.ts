import { Repository, FindOptionsWhere, FindManyOptions, ObjectLiteral } from 'typeorm';
import { Connection, Edge, PageInfo, PaginationArgs } from '@edumatrix/shared';


export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
  /**
   * Generic paginate method - works directly with TypeORM
   * Extends Repository so all TypeORM methods are available
   */
  async paginate(
    args: PaginationArgs = {},
    where?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    options?: Omit<FindManyOptions<T>, 'where' | 'take' | 'skip'>
  ): Promise<Connection<T>> {
    // Set defaults
    const first = args.first || 10;
    const after = args.after;
    const last = args.last;
    const before = args.before;

    // Get total count with filters
    const totalCount = await this.count({ where } as any);

    let items: T[] = [];
    let startIndex = 0;

    // Forward pagination (first, after)
    if (first !== undefined && !last) {
      if (after) {
        // Decode cursor to get ID
        const afterId = this.decodeCursor(after);
        
        // Find all items to get the correct index
        const allItems = await this.find({
          where,
          order: options?.order || ({ id: 'ASC' } as any),
          select: ['id'] as any,
        });
        
        const afterIndex = allItems.findIndex(item => item.id === afterId);
        startIndex = afterIndex + 1;

        // Get items after cursor
        items = await this.find({
          where,
          skip: startIndex,
          take: first,
          ...options,
        } as any);
      } else {
        // No cursor, get first N items
        items = await this.find({
          where,
          take: first,
          ...options,
        } as any);
      }
    }
    // Backward pagination (last, before)
    else if (last !== undefined) {
      if (before) {
        // Decode cursor to get ID
        const beforeId = this.decodeCursor(before);
        
        // Find all items to get the correct index
        const allItems = await this.find({
          where,
          order: options?.order || ({ id: 'ASC' } as any),
          select: ['id'] as any,
        });
        
        const beforeIndex = allItems.findIndex(item => item.id === beforeId);
        startIndex = Math.max(0, beforeIndex - last);

        // Get items before cursor
        items = await this.find({
          where,
          skip: startIndex,
          take: last,
          ...options,
        } as any);
      } else {
        // No cursor, get last N items
        startIndex = Math.max(0, totalCount - last);
        items = await this.find({
          where,
          skip: startIndex,
          take: last,
          ...options,
        } as any);
      }
    }

    // Create edges with cursors
    const edges: Edge<T>[] = items.map(item => ({
      cursor: this.encodeCursor(item.id),
      node: item,
    }));

    // Create page info
    const hasNextPage = startIndex + items.length < totalCount;
    const hasPreviousPage = startIndex > 0;

    const pageInfo: PageInfo = {
      hasNextPage,
      hasPreviousPage,
      startCursor: edges.length > 0 ? edges[0].cursor : null,
      endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
    };

    return {
      edges,
      pageInfo,
      totalCount,
    };
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