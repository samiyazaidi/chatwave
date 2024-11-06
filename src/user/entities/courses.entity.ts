import { IsIn } from "class-validator";
import { Users } from "../../students/entities/student.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Courses{

@PrimaryGeneratedColumn('uuid')
id:string

// @IsIn(['BSc(Computer Application)', 'MCA', 'MSc(CyberSecurity)', 'PHD'])
@Column()
course:string

@CreateDateColumn() 'created_at': Date;

@UpdateDateColumn() 'updated_at': Date;

@OneToMany(() => Users, user => user.courses) 
@JoinColumn({ name: 'course' })  
user: Users[]; 

}