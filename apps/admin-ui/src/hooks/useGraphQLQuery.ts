import { useQuery } from '@tanstack/react-query';
import { graphQLClient } from '@/lib/graphqlClient';
import { DocumentNode } from 'graphql';

interface UseGraphQLQueryProps<T> {
    key: string;
    query: string | DocumentNode;
    valiables?: Record<string, any>;
    select?: (data: any) => T;
}

export function useGraphQLQuery<T>({
    key,
    query,
    valiables,
    select,
}: UseGraphQLQueryProps<T>) {
    return useQuery({
        queryKey: [key, valiables],
        queryFn: async () => {
            const data = await graphQLClient.request(query, valiables);

            return select ? select(data[key] ?? []) : data[key] ?? [];
        }
    })
}