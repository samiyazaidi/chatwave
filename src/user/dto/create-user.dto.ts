import { IsString, IsEmail, IsNotEmpty,IsStrongPassword, Matches, IsOptional, IsEnum, IsPhoneNumber, MinLength, MaxLength, IsIn, ValidateIf, IsObject } from 'class-validator';
import { Semester } from '../../students/entities/student.entity';
import { Transform, TransformFnParams, Type } from 'class-transformer';
class SuperUserDetails{
    @IsNotEmpty()
    EmployeeId:string
    
    @IsNotEmpty()
    @IsPhoneNumber()
    MobileNo: string

}

class UserDetails {
    @IsNotEmpty()
    @IsString()
    @Matches(/^[a-zA-Z]{2}\d{4}$/)
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

export class OnboardingDto{
    
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(32)
    @Matches(/^[a-zA-Z ]*$/, { message: 'Invalid FirstName' })
    @Transform(({ value }: TransformFnParams) => value.trim())
    firstName: string;
    
    @MaxLength(32)
    @Matches(/^[a-zA-Z ]*$/, { message: 'Invalid LastName' })
    @Transform(({ value }: TransformFnParams) => value.trim())
    lastName: string;
    
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please enter a valid email' })
    email:string;

    @IsNotEmpty()
    @IsIn(['user', 'superUser'])
    type: string;
    
    @ValidateIf(o => o.type === 'superUser')
    @IsNotEmpty()
    @IsObject()
    @Type(() => SuperUserDetails)
    superUserDetails: SuperUserDetails;
  
    @ValidateIf(o => o.type === 'user')
    @IsNotEmpty()
    @IsObject()
    @Type(() => UserDetails)
    userDetails: UserDetails;
    
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
    
    @IsNotEmpty()
    @IsStrongPassword()
    confirmPassword: string;
}