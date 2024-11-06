import { IsIn, IsUUID } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne } from 'typeorm';
import { Users } from '../../students/entities/student.entity';
import { SuperUsers } from '../../teachers/entities/teacher.entity';
import { UserType } from './userType.entity';


@Entity({name:'onboarding_users'})
export class Onboarding{
    
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique:true})
  firstName:string;

  @Column()
  lastName:string;

  @Column()
  email:string;

  @Column()
  password:string;

  @OneToOne(() => SuperUsers, superUsers => superUsers.superUsers, { cascade: ["insert"] })
  SuperUserDetails: SuperUsers;

  @OneToOne(() => Users, users => users.users, { cascade: ["insert"] })
  userDetails: Users;

  @ManyToOne(() => UserType, userType => userType.type, { cascade: ["insert"] }) 
  userType: UserType;

  @CreateDateColumn() 'created_at': Date;

  @UpdateDateColumn() 'updated_at': Date;

}