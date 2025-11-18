import { Field, ObjectType, InputType, Int } from '@nestjs/graphql';

@ObjectType()
export class PageInfo {
    @Field()
    hasNextPage: boolean;

    @Field()
    hasPreviousPage: boolean;

    @Field({nullable: true})
    startCursor?: string;

    @Field({nullable: true})
    endCursor?: string;
}

@InputType()
export class PaginationArgs {
    @Field(()=> Int, { nullable: true, defaultValue: 10})
    first?: number;

    @Field({ nullable: true})
    after?: string;

    @Field(() => Int, { nullable: true})
    last?: number;

    @Field({ nullable: true})
    before?: string;
}

export interface Edge<T> {
    cursor: string;
    node: T;
}

export interface Connection<T> {
    edges: Edge<T>[];
    pageInfo: PageInfo;
    totalCount: number;
}

