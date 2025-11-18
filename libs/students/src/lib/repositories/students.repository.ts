import { DataSource, Like } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository, CustomRepository  } from '@edumatrix/core';
import { Student } from '../entities';

@CustomRepository(Student)
export class StudentsRepository extends BaseRepository<Student> {
  
}