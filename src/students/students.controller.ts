import { Body, Controller, Post, Query } from '@nestjs/common';
import { OnboardingDto } from '../user/dto/create-user.dto';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('students')
export class StudentsController {
    constructor( private readonly studentsService:StudentsService){}

    @Post('/register')
    async register(@Query() id:string,
        @Body() createStudentDto: CreateStudentDto) {
      await this.studentsService.createStudent(id, createStudentDto);
      return { message: 'User registered successfully' };
    }
}
