import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pagination } from '../types/DataGrid';

type DataGridState = {
    filters: Record<string, any>;
    sorting: Record<string, 'asc' | 'desc'>;
    pagination: Pagination;
}

const initialState: DataGridState = {
    filters: {},
    sorting: {},
    pagination: {
        pageIndex: 0,
        pageSize: 10,
    }
}

const datagridSlice = createSlice({
    name: 'datagrid',
    initialState,
    reducers: {
        setFilters(state, action: PayloadAction<Record<string, any>>) {
            state.filters = action.payload;
            state.pagination.pageIndex = 0; // Reset to first page on filter change
        },
        setSorting(state, action: PayloadAction<DataGridState['sorting']>) {
            state.sorting = action.payload;
            state.pagination.pageIndex = 0; // Reset to first page on sorting change
        },
        setPagination(state, action: PayloadAction<Pagination>) {
            state.pagination = action.payload;
        },
        reset(state) {
            state.filters = {};
            state.sorting = {};
            state.pagination = initialState.pagination;
        }
    }
});

export const { setFilters, setSorting, setPagination, reset } = datagridSlice.actions;
export default datagridSlice.reducer;