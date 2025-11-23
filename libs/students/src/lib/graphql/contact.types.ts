import { Field, ObjectType, InputType, ID, Int, registerEnumType } from '@nestjs/graphql';

@ObjectType()
export class ContactType {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  studentId: number; // Foreign Key to StudentParent

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  currentAddress?: string;

  @Field({ nullable: true })
  permanentAddress?: string;

  @Field({ nullable: true })
  emergencyContact?: string;
}