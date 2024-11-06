import { Onboarding } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class SuperUsers {

@PrimaryGeneratedColumn('uuid')
id: string;

@OneToOne(() => Onboarding,Onboarding => Onboarding.SuperUserDetails,{onDelete:"CASCADE"})
@JoinColumn({ name: 'user_id' })
superUsers: Onboarding

@Column({ name: 'user_id' })
userId: string;

@Column()
employeeId: string

@CreateDateColumn() 'created_at': Date;

@UpdateDateColumn() 'updated_at': Date;
}