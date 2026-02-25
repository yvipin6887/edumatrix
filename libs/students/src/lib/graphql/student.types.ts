import { Field, ObjectType, InputType, ID, Int, registerEnumType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsEmpty, Length } from 'class-validator';
import { PageInfo } from '@edumatrix/shared';
import { ContactType } from './contact.types';
import { StudentParentType } from './parent.types';

export enum StudentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  GRADUATED = 'GRADUATED',
  SUSPENDED = 'SUSPENDED',
}

export enum Grade {
  GRADE_1 = 'GRADE_1',
  GRADE_2 = 'GRADE_2',
  GRADE_3 = 'GRADE_3',
  GRADE_4 = 'GRADE_4',
  GRADE_5 = 'GRADE_5',
  GRADE_6 = 'GRADE_6',
  GRADE_7 = 'GRADE_7',
  GRADE_8 = 'GRADE_8',
  GRADE_9 = 'GRADE_9',
  GRADE_10 = 'GRADE_10',
  GRADE_11 = 'GRADE_11',
  GRADE_12 = 'GRADE_12',
}

registerEnumType(StudentStatus, {
  name: 'StudentStatus',
});

registerEnumType(Grade, {
  name: 'Grade',
});

// Student ObjectType
@ObjectType('Student')
export class StudentType {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  dateOfBirth: Date;

  @Field(() => Grade)
  grade: Grade;

  @Field(() => StudentStatus)
  status: StudentStatus;

  @Field()
  enrollmentDate: Date;

  @Field({ nullable: true })
  avatar?: string;

  @Field(() => ContactType, { nullable: true })
  contact?: ContactType;

  @Field(() => [StudentParentType], { nullable: true })
  parents?: StudentParentType[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}





// Student Edge
@ObjectType('StudentEdge')
export class StudentEdge {
  @Field(() => String)
  cursor: string;

  @Field(() => StudentType)
  node: StudentType;
}

// Student Connection - THIS IS THE KEY FIX!
@ObjectType('StudentConnection')
export class StudentConnection {
  @Field(() => [StudentEdge], { description: 'Array of student edges' })
  edges: StudentEdge[];

  @Field(() => PageInfo, { description: 'Pagination information' })
  pageInfo: PageInfo;

  @Field(() => Int, { description: 'Total count of students' })
  totalCount: number;
}

// Input Types
@InputType()
export class CreateStudentInput {
  @Field()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  dateOfBirth: Date;

  @Field(() => Grade)
  @IsNotEmpty()
  grade: Grade;

  @Field({ nullable: true })
  parentName?: string;

  @Field({ nullable: true })
  parentEmail?: string;

  @Field({ nullable: true })
  parentPhone?: string;

  @Field({ nullable: true })
  address?: string;
}

@InputType()
export class UpdateStudentInput {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field(() => Grade, { nullable: true })
  grade?: Grade;

  @Field(() => StudentStatus, { nullable: true })
  status?: StudentStatus;

  @Field({ nullable: true })
  parentName?: string;

  @Field({ nullable: true })
  parentEmail?: string;

  @Field({ nullable: true })
  parentPhone?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  medicalInfo?: string;
}

@InputType()
export class StudentFilterInput {
  @Field(() => Grade, { nullable: true })
  grade?: Grade;

  @Field(() => StudentStatus, { nullable: true })
  status?: StudentStatus;

  @Field({ nullable: true })
  @IsEmpty()
  search?: string;
}

// Mutation Payload Types
@ObjectType('CreateStudentPayload')
export class CreateStudentPayload {
  @Field(() => StudentType)
  student: StudentType;

  @Field(() => String)
  message: string;

  @Field(() => Boolean)
  success: boolean;
}