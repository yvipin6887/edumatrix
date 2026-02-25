import { Table } from '@tanstack/react-table';
import { Download, Settings2, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';

interface DataTableToolbarEnhancedProps<TData> {
  table: Table<TData>;
  enableGlobalFilter?: boolean;
  enableColumnVisibility?: boolean;
  enableExport?: boolean;
  exportFileName?: string;
  customActions?: React.ReactNode;
  showColumnFilters?: boolean;
  setFiltersData: (filters: Record<string, any>) => void;
  filters?: Record<string, any>;
}

export function DataTableToolbarEnhanced<TData>({
  table,
  enableGlobalFilter = true,
  enableColumnVisibility = false,
  enableExport = false,
  exportFileName = 'data-export',
  customActions,
  showColumnFilters = false,
  setFiltersData,
  filters,
}: DataTableToolbarEnhancedProps<TData>) {
  const [showFilters, setShowFilters] = useState(showColumnFilters);
  let search = (table.getState().globalFilter as string);

  console.log(filters, 'filters', table.getState().globalFilter as string)

  useEffect(() => {
    setFiltersData({ ...filters, search: search });
  }, [search]);
//   const isFiltered = table.getState().columnFilters.length > 0 || 
//                      table.getState().globalFilter;
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
        
    </div>
)
}


