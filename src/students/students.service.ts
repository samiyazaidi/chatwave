import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Onboarding } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { Users } from './entities/student.entity';
import { Courses } from '../user/entities/courses.entity';

@Injectable()
export class StudentsService {
    constructor(
    @InjectRepository(Onboarding)
    private readonly usersRepository: Repository<Onboarding>,
    @InjectRepository(Courses)
    private readonly courseRepository: Repository<Courses>,
    @InjectRepository(Users)
    private readonly studentsRepository: Repository<Users>){}

    async createStudent(id:string, createStudentDto:CreateStudentDto){
        const user = await this.usersRepository.findOne({
            where: {id }
        })
        if(user){
            // const course = createStudentDto.Course;
            // console.log(course)
            // const courses = await this.courseRepository.findOne({where:{course}});
            // const c = courses.filter(course=>course.id.id)

            //  console.log(courses)
            // if(c.isequals(createStudentDto.Course) ){
            //     console.log("course not found")
            // }
            const details = {
                // ...createStudentDto,
            userId : id,
            enrollmentNo : createStudentDto.EnrollmentNo,
            facultyNo : createStudentDto.FacultyNo,
            courseId: createStudentDto.Course ,
            semester : createStudentDto.Semester,
            mobileNo: createStudentDto.MobileNo,
            }
        
        return this.studentsRepository.save(details);
        }

    }
}
