import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Student } from './student.entity';

@Entity({ name: 'student_contacts' })
export class StudentContact {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Student, (student) => student.contact)
  student: Student;

  @Column({ type: 'varchar', length: 150, nullable: true })
  email?: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  emergencyContact?: string;

  @Column({ type: 'text', nullable: true })
  currentAddress?: string;

  @Column({ type: 'text', nullable: true })
  permanentAddress?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}