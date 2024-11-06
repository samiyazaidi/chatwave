import { IsString, IsEmail, IsNotEmpty,IsStrongPassword, Matches, IsNumber, IsPhoneNumber, IsIn, IsEnum } from 'class-validator';
import { Semester } from '../entities/student.entity';
export class CreateStudentDto{

    // @IsNotEmpty()
    // @Matches(/^[a-zA-Z]{2}\d{4}$/)
    EnrollmentNo: string

    @IsNotEmpty()
    FacultyNo: string

    @IsNotEmpty()
    Course:string

    @IsEnum(Semester)
    Semester: Semester;

    @IsNotEmpty()
    @IsPhoneNumber()
    MobileNo: string 

}