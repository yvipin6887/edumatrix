import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Student } from './student.entity';

export enum ParentRelation {
  FATHER = 'father',
  MOTHER = 'mother',
  GRANDFATHER = 'grandfather',
  GRANDMOTHER = 'grandmother',
  GUARDIAN = 'guardian',
  OTHER = 'other',
}

@Entity({ name: 'student_parents' })
export class StudentParent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (s) => s.parents, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_id' })  // foreign key
  student: Student;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  lastName?: string;

  @Column({ type: 'enum', enum: ParentRelation })
  relation: ParentRelation;

  @Column({ type: 'varchar', length: 30, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  email?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}