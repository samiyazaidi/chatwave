import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserType } from "./userType.entity";
import { Onboarding } from "./user.entity";

 
  @Entity()
  export class User_has_type {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string
    @OneToOne(()=> Onboarding,user=>user.id)
    onboarding: Onboarding
    
    @Column()
    typeId:string
    @ManyToOne(()=> UserType, usertype=>usertype.id)
    Type: UserType;

    @CreateDateColumn() 'created_at': Date;

    @UpdateDateColumn() 'updated_at': Date;

  }
