import { Table } from '@tanstack/react-table';
import { X, Download, Settings2, Filter } from 'lucide-react';
import { useState } from 'react';

interface DataTableToolbarEnhancedProps<TData> {
  table: Table<TData>;
  enableGlobalFilter?: boolean;
  enableColumnVisibility?: boolean;
  enableExport?: boolean;
  exportFileName?: string;
  customActions?: React.ReactNode;
  showColumnFilters?: boolean;
}

export function DataTableToolbarEnhanced<TData>({
  table,
  enableGlobalFilter = true,
  enableColumnVisibility = false,
  enableExport = false,
  exportFileName = 'data-export',
  customActions,
  showColumnFilters = false,
}: DataTableToolbarEnhancedProps<TData>) {
  const [showFilters, setShowFilters] = useState(showColumnFilters);
  
  const isFiltered = table.getState().columnFilters.length > 0 || 
                     table.getState().globalFilter;
    return (
    <div className="space-y-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-2">
            <div className="flex flex-1 items-center space-x-2">
                {enableGlobalFilter && (
                    <input
                        placeholder="Search all columns..."
                        value={(table.getState().globalFilter as string) ?? ''}
                        onChange={(event) =>
                            table.setGlobalFilter(event.target.value)
                        }
                        className="h-10 min-w-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                )}
            </div>

            <div className="flex items-center space-x-2">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`h-10 px-4 py-2 inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-background hover:bg-accent hover:text-accent-foreground
                    ${showFilters ? "bg-accent" : ""}
                    `}
                >
                    <Filter className="mr-2 h-6 w-6" />
                </button>

                {enableExport && (
                    <button
                    className="h-10 px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                    >
                    <Download className="mr-2 h-4 w-4" />
                    Export
                    </button>
                )}
                
                {enableColumnVisibility && (
                    <div className="relative inline-block">
                    <button className="h-10 px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                        <Settings2 className="mr-2 h-4 w-4" />
                        View
                    </button>
                    </div>
                )}
          </div>

        </div>

        {/* Column Filters Section */}
        {showFilters && (
            <div className="border border-border rounded-lg p-4 bg-muted/50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {table.getAllColumns()
                .filter(column => column.getCanFilter())
                .map((column) => {
                    const FilterComponent = column.columnDef.meta?.filterComponent;
                    
                    return (
                    <div key={column.id} className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                        {typeof column.columnDef.header === 'string' 
                            ? column.columnDef.header 
                            : column.id}
                        </label>
                        {FilterComponent ? (
                        <FilterComponent column={column} />
                        ) : (
                        <input
                            value={(column.getFilterValue() ?? '') as string}
                            onChange={(e) => column.setFilterValue(e.target.value || undefined)}
                            placeholder={`Filter...`}
                            className="w-full px-2 py-1 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        )}
                    </div>
                    );
                })}
            </div>
            
            {table.getState().columnFilters.length > 0 && (
                <div className="mt-4 flex justify-end">
                <button
                    onClick={() => table.resetColumnFilters()}
                    className="px-4 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                >
                    Clear Column Filters
                </button>
                </div>
            )}
            </div>
        )}
    </div>
)
}


