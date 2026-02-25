import { Field, ObjectType, InputType, ID, Int, registerEnumType } from '@nestjs/graphql';

export enum ParentRelation {
  FATHER = 'father',
  MOTHER = 'mother',
  GRANDFATHER = 'grandfather',
  GRANDMOTHER = 'grandmother',
  GUARDIAN = 'guardian',
  OTHER = 'other',
}

registerEnumType(ParentRelation, {
  name: 'ParentRelation', // this name will appear in GraphQL schema
  description: 'Relation of parent/guardian to the student',
});

@ObjectType()
export class StudentParentType {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  studentId: number;

  @Field()
  firstName: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field(() => ParentRelation)
  relation: ParentRelation;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  email?: string;
}