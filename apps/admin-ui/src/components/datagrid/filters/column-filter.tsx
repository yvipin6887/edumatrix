"use client";

import { Column } from '@tanstack/react-table';
import { useState, useEffect } from 'react';

interface ColumnFilterProps<TData> {
  column: Column<TData>;
}

// Text Input Filter
export function TextFilter<TData>({ column }: ColumnFilterProps<TData>) {
  const value = (column.getFilterValue() ?? '') as string;

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => column.setFilterValue(e.target.value || undefined)}
      placeholder={`Filter...`}
      className="w-full px-2 py-1 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
    />
  );
}

// Select/Dropdown Filter
export function SelectFilter<TData>({ column }: ColumnFilterProps<TData>) {
  const uniqueValues = Array.from(column.getFacetedUniqueValues().keys()).sort();
  const value = (column.getFilterValue() ?? '') as string;

  return (
    <select
      value={value}
      onChange={(e) => column.setFilterValue(e.target.value || undefined)}
      className="w-full px-2 py-1 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
    >
      <option value="">All</option>
      {uniqueValues.map((val) => (
        <option key={String(val)} value={String(val)}>
          {String(val)}
        </option>
      ))}
    </select>
  );
}

// Multi-Select Filter with Checkboxes
export function MultiSelectFilter<TData>({ column }: ColumnFilterProps<TData>) {
  const uniqueValues = Array.from(column.getFacetedUniqueValues().keys()).sort();
  const filterValue = (column.getFilterValue() as string[]) ?? [];
  const [isOpen, setIsOpen] = useState(false);

  const toggleValue = (value: string) => {
    const newValues = filterValue.includes(value)
      ? filterValue.filter((v) => v !== value)
      : [...filterValue, value];
    
    column.setFilterValue(newValues.length > 0 ? newValues : undefined);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-2 py-1 text-sm border border-input rounded-md bg-background text-left flex justify-between items-center"
      >
        <span className="truncate">
          {filterValue.length > 0 
            ? `${filterValue.length} selected`
            : 'Select...'}
        </span>
        <span className="ml-2">▼</span>
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-20 w-full mt-1 bg-background border border-input rounded-md shadow-lg max-h-60 overflow-auto">
            {uniqueValues.map((val) => (
              <label
                key={String(val)}
                className="flex items-center px-3 py-2 hover:bg-muted cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filterValue.includes(String(val))}
                  onChange={() => toggleValue(String(val))}
                  className="mr-2 h-4 w-4 rounded border-input"
                />
                <span className="text-sm">{String(val)}</span>
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Number Range Filter
export function NumberRangeFilter<TData>({ column }: ColumnFilterProps<TData>) {
  const [value, setValue] = useState<[number?, number?]>(
    (column.getFilterValue() as [number?, number?]) ?? [undefined, undefined]
  );

  useEffect(() => {
    column.setFilterValue(value);
  }, [value, column]);

  return (
    <div className="flex gap-1">
      <input
        type="number"
        value={value[0] ?? ''}
        onChange={(e) => setValue([e.target.value ? Number(e.target.value) : undefined, value[1]])}
        placeholder="Min"
        className="w-20 px-2 py-1 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <span className="flex items-center px-1">-</span>
      <input
        type="number"
        value={value[1] ?? ''}
        onChange={(e) => setValue([value[0], e.target.value ? Number(e.target.value) : undefined])}
        placeholder="Max"
        className="w-20 px-2 py-1 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}

// Date Range Filter
export function DateRangeFilter<TData>({ column }: ColumnFilterProps<TData>) {
  const [value, setValue] = useState<[string?, string?]>(
    (column.getFilterValue() as [string?, string?]) ?? [undefined, undefined]
  );

  useEffect(() => {
    column.setFilterValue(value);
  }, [value, column]);

  return (
    <div className="flex flex-col gap-1">
      <input
        type="date"
        value={value[0] ?? ''}
        onChange={(e) => setValue([e.target.value || undefined, value[1]])}
        className="w-full px-2 py-1 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <input
        type="date"
        value={value[1] ?? ''}
        onChange={(e) => setValue([value[0], e.target.value || undefined])}
        className="w-full px-2 py-1 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}

// Boolean Filter (Yes/No/All)
export function BooleanFilter<TData>({ column }: ColumnFilterProps<TData>) {
  const value = column.getFilterValue() as boolean | undefined;

  return (
    <select
      value={value === undefined ? '' : String(value)}
      onChange={(e) => {
        const val = e.target.value;
        column.setFilterValue(val === '' ? undefined : val === 'true');
      }}
      className="w-full px-2 py-1 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
    >
      <option value="">All</option>
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select>
  );
}

// Export all filters
export const ColumnFilters = {
  Text: TextFilter,
  Select: SelectFilter,
  MultiSelect: MultiSelectFilter,
  NumberRange: NumberRangeFilter,
  DateRange: DateRangeFilter,
  Boolean: BooleanFilter,
};