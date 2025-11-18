import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { StudentsService } from '../services';
import { Student } from '../entities';
import { StudentConnection, StudentType, StudentFilterInput, CreateStudentInput, CreateStudentPayload } from '../graphql/student.types';
import { PaginationArgs } from '@edumatrix/shared';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(private readonly studentsService: StudentsService) {}

  @Query(() => StudentConnection, { 
    name: 'students',
    description: 'Get paginated list of students'
  })
  async findAll(
    @Args('first', { type: () => Int, nullable: true }) first?: number,
    @Args('after', { type: () => String, nullable: true }) after?: string,
    @Args('last', { type: () => Int, nullable: true }) last?: number,
    @Args('before', { type: () => String, nullable: true }) before?: string,
    @Args('filters', { type: () => StudentFilterInput, nullable: true }) filters?: StudentFilterInput
  ): Promise<StudentConnection> {
    const paginationArgs = { first, after, last, before };
    const result = await this.studentsService.findAll(paginationArgs, filters);
    
    // The result from repository is already in the correct format
    return result as StudentConnection;
  }

  @Mutation(() => CreateStudentPayload)
  async createStudent(
    @Args('input', { type: () => CreateStudentInput }) input: CreateStudentInput
  ): Promise<any> {

    const student = await this.studentsService.create(input);
    return {
      student: student as StudentType,
      message: 'Student created successfully',
      success: true,
    };
  }
}
