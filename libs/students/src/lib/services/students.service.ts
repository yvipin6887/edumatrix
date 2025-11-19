import { Injectable, BadRequestException } from '@nestjs/common'
import { Student } from '../entities'
import { InjectRepository } from '@nestjs/typeorm'
import { StudentsRepository } from '../repositories/students.repository';
import { StudentStatus, Grade, CreateStudentInput } from '../graphql/student.types';
import { PaginationArgs } from '@edumatrix/shared';

@Injectable()
export class StudentsService {
    constructor(
        private readonly studentRepo: StudentsRepository,
    ) {}

    async findAll(
        args: PaginationArgs,
        filters?: {
        grade?: Grade;
        status?: StudentStatus;
        search?: string;
        }
    ) {
        
        return this.studentRepo.paginate();
    }

    /**
     * Create new student
     */
    async create(input: CreateStudentInput): Promise<any> {
        const studentData = {
        ...input,
        status: StudentStatus.ACTIVE,
        enrollmentDate: new Date(),
        };

        const exists = await this.studentRepo.findOne({
            where: { email: input.email },
        });

        if (exists) {
            throw new BadRequestException({
            errors: {
                email: ['Email already exists'],
            },
            });
        }

        let student  = this.studentRepo.create(studentData as any);

        return this.studentRepo.save(student);
    }
}