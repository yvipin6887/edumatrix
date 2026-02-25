import { useMemo, useCallback } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { useGraphQLQuery } from '@/hooks/useGraphQLQuery';
import { Pagination } from "@/types/DataGrid";
import { setFilters, setPagination, setSorting } from "@/slices/datagridSlice";
import { DocumentNode } from "graphql";

type UseDataGridProps<TData> = {
    key: string;
    query: string | DocumentNode;
    select?: (data: any) => TData[];
}

export const useDataGrid = <TData>({
    key,
    query,
    select,
}: UseDataGridProps<TData>) => {
    const dispatch = useDispatch();
    const {filters, pagination, sorting} = useSelector(
        (state: any) => state.datagrid,
        shallowEqual
    );
    
    const variables = useMemo(() => ({
        filters,
        pagination: { page: pagination.pageIndex + 1, pageSize: pagination.pageSize },
        sort: sorting,
    }), [filters, sorting, pagination]);

     const { data, isLoading, error, refetch } = useGraphQLQuery<TData[]>({
        key,
        query,
        variables: variables,
        select,
    });

    const reload = () => refetch();
    
    const setPage = useCallback(
        (p: Pagination) => dispatch(setPagination(p)),
        [dispatch]
    );

    const setSort = useCallback(
        (s: any) => dispatch(setSorting(s)),
        [dispatch]
    );

    const setFiltersData = useCallback(
        (f: Record<string, any>) => dispatch(setFilters(f)),
        [dispatch]
    );

    return {
        data,
        isLoading,
        error,
        filters,
        pagination,
        sorting,
        setPage,
        reload,
        setSort,
        setFiltersData
    }
}