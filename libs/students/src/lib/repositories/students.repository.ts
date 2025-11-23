import { DataSource, Like } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository, CustomRepository  } from '@edumatrix/core';
import { Student } from '../entities';

@CustomRepository(Student)
export class StudentsRepository extends BaseRepository<Student> {
  protected override alias = 'st';
  protected override searchableColumns = ['firstName', 'lastName', 'email'];

  protected override queryBuilder()
  {
    return this.createQueryBuilder(this.alias)
      .leftJoinAndSelect(`${this.alias}.contact`, 'contact')
      .select([
        `${this.alias}.id`,
        `${this.alias}.firstName`,
        `${this.alias}.lastName`,
        `${this.alias}.dateOfBirth`,
        `${this.alias}.grade`,
        `${this.alias}.status`,
        `${this.alias}.enrollmentDate`,
        `contact.id as  contact_id`,
        `contact.phone as phone`,
        `contact.email as email`,
      ])
      // .leftJoin(`${this.alias}.contact`, 'contact')
  }
}