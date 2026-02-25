import { DataSource, Like } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository, CustomRepository  } from '@edumatrix/core';
import { Student } from '../entities';

@CustomRepository(Student)
export class StudentsRepository extends BaseRepository<Student> {
  protected override alias = 'st';
  protected override searchableColumns = ['st.firstName', 'st.lastName', 'contact.email', 'contact.phone'];

  protected override queryBuilder()
  {
    return this.createQueryBuilder(this.alias)
      .leftJoin(`${this.alias}.contact`, 'contact')
      .select([
        `${this.alias}.id AS "id"`,
        `${this.alias}.firstName AS "firstName"`,
        `${this.alias}.lastName AS "lastName"`,
        `${this.alias}.dateOfBirth AS "dateOfBirth"`,
        `${this.alias}.grade AS "grade"`,
        `${this.alias}.status AS "status"`,
        `${this.alias}.enrollmentDate AS "enrollmentDate"`,
        `contact.id AS "contact_id"`,
        `contact.phone AS "phone"`,
        `contact.email AS "email"`
      ])
      // .leftJoin(`${this.alias}.contact`, 'contact')
  }

  protected override formatData(row: any)
  {
    return {
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      dateOfBirth: row.dateOfBirth,
      grade: row.grade,
      status: row.status,
      enrollmentDate: row.enrollmentDate,
      contact: {
        id: row.contact_id,
        phone: row.phone,
        email: row.email,
      },
    }
  }
}