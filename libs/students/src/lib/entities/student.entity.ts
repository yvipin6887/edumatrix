import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { StudentStatus, Grade } from '../graphql/student.types';

@ObjectType()     // For GraphQL
@Entity()         // For TypeORM
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({
    type: 'enum',
    enum: Grade,
  })
  grade: Grade;

  @Column({
    type: 'enum',
    enum: StudentStatus,
    default: StudentStatus.ACTIVE,
  })
  status: StudentStatus;

  @Column({ type: 'date' })
  enrollmentDate: Date;

  @Column({ nullable: true })
  parentName?: string;

  @Column({ nullable: true })
  parentEmail?: string;

  @Column({ nullable: true })
  parentPhone?: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ type: 'json', nullable: true })
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };

  @Column({ type: 'text', nullable: true })
  medicalInfo?: string;

  @Column({ nullable: true })
  avatar?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
