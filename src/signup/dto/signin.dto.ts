import { IsString, IsEmail, IsNotEmpty,IsStrongPassword, Matches, IsOptional, IsEnum, IsPhoneNumber, MinLength, MaxLength, IsIn, ValidateIf, IsObject, IS_STRONG_PASSWORD } from 'class-validator';
import { Transform, TransformFnParams, Type } from 'class-transformer';

export class SignInDto{
@IsNotEmpty()
@IsEmail()
email:string;

@IsNotEmpty()
password:string
}