import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    OneToMany,
  } from 'typeorm';
  import { Onboarding } from './user.entity';
  
  export enum Types {
    SuperUser = 'superUser',
    User = 'user'
  }
  
  @Entity()
  export class UserType {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({
      type: 'enum',
      enum: Types,
      default: 'user',
    })
    type: Types;
    @OneToMany(() => Onboarding, onboarding => onboarding.userType)
    onboardings: Onboarding[];
  
    @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;
  
    @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;
  }
  