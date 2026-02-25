import { useQuery } from '@tanstack/react-query';
import { graphQLClient } from '@/lib/graphqlClient';
import { DocumentNode } from 'graphql';

interface UseGraphQLQueryProps<T> {
    key: string;
    query: string | DocumentNode;
    variables?: Record<string, any>;
    select?: (data: any) => T;
}

export function useGraphQLQuery<T>({
    key,
    query,
    variables,
    select,
}: UseGraphQLQueryProps<T>) {
    return useQuery({
        queryKey: [key, variables],
        queryFn: async () => {
            const data = await graphQLClient.request(query, variables);

            return select ? select(data[key] ?? []) : data[key] ?? [];
        }
    })
}