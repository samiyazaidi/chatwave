import { IsString, IsEmail, IsNotEmpty,IsStrongPassword, Matches, IsPhoneNumber } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateTeacherDto{

    @IsNotEmpty()
    EmployeeId: string

    @IsNotEmpty()
    @IsPhoneNumber()
    MobileNo: string 
}