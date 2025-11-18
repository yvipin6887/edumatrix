import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm'
import { TypeOrmExModule } from '@edumatrix/core';
import { Student } from './entities'
import { StudentsService } from './services';
import { StudentsResolver } from './resolvers';
import { StudentsRepository } from './repositories/students.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
    Student
  ]),
    TypeOrmExModule.forCustomRepository([StudentsRepository])
  ],
  controllers: [],
  providers: [StudentsService, StudentsResolver],
  exports: [StudentsService],
})
export class StudentsModule {}
