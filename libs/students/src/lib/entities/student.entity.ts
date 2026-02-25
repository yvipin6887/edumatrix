import { Field, ObjectType, ID, } from '@nestjs/graphql';
import { Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { StudentStatus, Grade } from '../graphql/student.types';
import { StudentParent } from './student-parent.entity';
import { StudentContact } from './student.contact.entity';

@ObjectType()     // For GraphQL
@Entity()         // For TypeORM
export class Student {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

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

  @Column({ type: 'text', nullable: true })
  medicalInfo?: string;

  @OneToOne(() => StudentContact, (contact) => contact.student, { cascade: true })
  @JoinColumn()
  contact: StudentContact;

  @OneToMany(() => StudentParent, (p) => p.student, { cascade: true })
  parents: StudentParent[];

  @Column({ nullable: true })
  avatar?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
