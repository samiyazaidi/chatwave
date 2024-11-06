import { IsEnum, IsIn } from 'class-validator';
import { Courses } from '../../user/entities/courses.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    OneToOne,
    JoinColumn,
    ManyToOne,
  } from 'typeorm';
import { Onboarding } from '../../user/entities/user.entity';

  export enum Semester {
    I = 'I',
    II = 'II',
    III = 'III',
    IV = 'IV',
    V = 'V',
    VI = 'VI',
    VII = 'VII',
    VIII = 'VIII',
  }
  @Entity()
  export class Users {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Onboarding,Onboarding => Onboarding.userDetails,{onDelete:"CASCADE"})
  @JoinColumn({ name: 'user_id' })
  users: Onboarding

  @Column({ name: 'user_id' })
  userId: string;

  @Column({unique:true, nullable: false} )
  enrollmentNo:string;

  @Column({unique:true})
  facultyNo:string;

  // @Column()
  // courseId: string

  @ManyToOne(()=> Courses,course=> course.id)
  courses: Courses

  @Column()
  @IsEnum(Semester)
  semester: Semester;

  @Column()
  mobileNo  : string

  @Column({ default: false })
  isVerified: boolean;

  @CreateDateColumn() 'created_at': Date;

  @UpdateDateColumn() 'updated_at': Date;

  }