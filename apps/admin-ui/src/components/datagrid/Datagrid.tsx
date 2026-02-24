"use client";

import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from 'lucide-react';
import { DataTableToolbarEnhanced } from './data-table-toolbar/data-table-toolbar-enhanced';
import { DocumentNode } from 'graphql';
import { useDataGrid } from '@/hooks/useDataGrid';

export interface DataGridProps<TData> {
  title?: string;
  columns: ColumnDef<any, any>[];
  keyName: string;
  query: string | DocumentNode;
  variables?: Record<string, any>;
  select?: (data: any) => TData[];
  pageSize?: number;
  enableSorting?: boolean;
  enableGlobalFilter?: boolean;
  enablePagination?: boolean;
  showToolbar?: boolean;
  manualFiltering?: boolean;
  enableColumnVisibility?: boolean;
}

function MemoizedDataGrid<TData>({
  title,
  columns,
  keyName,
  query,
  variables,
  select,
  pageSize = 10,
  enableSorting = true,
  enableGlobalFilter = true,
  enablePagination = true,
  manualFiltering = false,
  enableColumnVisibility = false,
showToolbar = true,
}: DataGridProps<TData>) {
  const { data, setFiltersData, filters } = useDataGrid<TData>({
    key: keyName,
    query,
    select,
  });

  const tableData = useMemo(
    () => data?.edges?.map((edge: any) => edge.node) ?? [],
    [data]
  );
  
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),   // REQUIRED
  });

  

  console.log("DataGrid data:", data);

  return (
      <div className="border border-gray-300 rounded-md p-4 bg-white shadow-sm">
        {showToolbar && (
          <DataTableToolbarEnhanced
            table={table}
            enableGlobalFilter={enableGlobalFilter}
            enableColumnVisibility={enableColumnVisibility}
            setFiltersData={setFiltersData}
            filters={filters}
          />
        )}
  
        <div className="overflow-x-auto pt-5">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th 
                      key={header.id}
                      className='px-2 py-2 text-left font-semibold text-gray-700 border-b'
                  >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'sortable-header'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr 
                  key={row.id}
                  className="even:bg-gray-50 hover:bg-gray-100"
              >
                  {row.getVisibleCells().map((cell) => (
                    <td 
                      key={cell.id}
                      className="px-2 py-2 border-b text-gray-800"
                  >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
              
              {data && data.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-3 text-gray-500"
                >
                  No data available
                </td>
              </tr>
              )}
            </tbody>
          </table>
        </div>
  
        {enablePagination && (
         <div
              className="flex items-center justify-between mt-4 gap-2"  
         >
              <div className="text-sm text-gray-600">
                  Page{' '}
                  <span className="font-medium">
                  {table.getState().pagination.pageIndex + 1}
                  </span>{' '}
                  of{' '}
                  <span className="font-medium">{table.getPageCount().toString()}</span>
              </div>
  
              <div className="flex items-center gap-2">
                  <button
                      className="p-2 border rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                      onClick={() => table.setPageIndex(0)}
                      disabled={!table.getCanPreviousPage()}
                  >
                      <ChevronsLeft size={16} />
                  </button>
  
                  <button
                      className="p-2 border rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                  >
                      <ChevronLeft size={16} />
                  </button>
  
                  <button
                      className="p-2 border rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                  >
                      <ChevronRight size={16} />
                  </button>
  
                  <button
                      className="p-2 border rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                      onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                      disabled={!table.getCanNextPage()}
                  >
                      <ChevronsRight size={16} />
                  </button>
              </div>
              <select
                  className="border rounded-lg text-sm px-2 py-1"
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                      table.setPageSize(Number(e.target.value));
                  }}
                  >
                  {[5, 10, 20, 50].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                      </option>
                  ))}
              </select>
          </div>
        )}
      </div>
    );
}

MemoizedDataGrid.displayName = 'DataGrid';

export const DataGrid = React.memo(MemoizedDataGrid);