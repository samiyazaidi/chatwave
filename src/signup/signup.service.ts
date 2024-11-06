import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Onboarding } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { PassService } from '../pass/pass.service';
import { OnboardingDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { AppService } from '../app.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { SuperUsers } from '../teachers/entities/teacher.entity';
import { Users } from '../students/entities/student.entity';
import { Types, UserType } from '../user/entities/userType.entity';
import { StudentsService } from '../students/students.service';
import { TeachersService } from '../teachers/teachers.service';

@Injectable()
export class SignupService {
  
    constructor(
    @InjectRepository(Onboarding)
    private readonly usersRepository: Repository<Onboarding>,
    private readonly studentsService:StudentsService,
    private readonly teacherService:TeachersService,
    private readonly passService:PassService,
    private readonly jwtService:JwtService,
    @InjectRepository(UserType)
    private readonly userTypeRepository: Repository<UserType>,
    @InjectRepository(SuperUsers)
    private readonly teachersRepository: Repository<SuperUsers>,
    @InjectRepository(Users)
    private readonly studentsRepository: Repository<Users>
  ){}

      async findById(id: string): Promise<Onboarding> {
        return this.usersRepository.findOne({
          where: { id },
        });
      }
      async findByEmail(email: string): Promise<Onboarding> {
        return this.usersRepository.findOne({
          where: { email },
        });
      }
      async validateUser(email: string, password: string): Promise<Onboarding | null> {
        const user = await this.findByEmail(email);
        if (user && await this.passService.validateUser(password, user.password)) {
          return user;
        }
        return null;
      }
    async signIn(email: string, pass: string): Promise<any> {
      const user = await this.findByEmail(email);
      
    const users = await this.validateUser(email,pass);
    if (users) {

      const payload={ sub:user.id, email:user.email, password:user.password}
      return await this.jwtService.signAsync(payload,{ secret: jwtConstants.secret })
    }
    else {
      return { message: 'Invalid credentials' };
    }
  }
    async createUser( createUserDto: OnboardingDto): Promise<Onboarding> {
    try{
      if (createUserDto.password !== createUserDto.confirmPassword) {
        throw new Error('Passwords do not match.');
    }
        // const hashedPassword = await this.passService.hashPassword(createUserDto.password);
        const saltRounds = 10; // Define the number of salt rounds
        const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
        const userType = await this.userTypeRepository.findOne({ where: { type: createUserDto.type as Types } });
        if (!userType) {
            throw new Error('Invalid user type.');
        }
        const newUser = new Onboarding();
        newUser.firstName = createUserDto.firstName;
        newUser.lastName = createUserDto.lastName;
        newUser.email = createUserDto.email;
        newUser.password = hashedPassword;
        newUser.userType = userType;

        const savedUser = await this.usersRepository.save(newUser);
        console.log(createUserDto.userDetails)
        // const userDetails = createUserDto.userDetails
        if (createUserDto.type === 'user') {
          if (!createUserDto.userDetails) {
            throw new Error('User details are missing.');
          }
          const student = new Users();
          // student.enrollmentNo = createUserDto.userDetails.EnrollmentNo;
          // student.facultyNo = createUserDto.userDetails.FacultyNo;
          // student.courseId = createUserDto.userDetails.Course;
          // student.semester = createUserDto.userDetails.Semester;
          // student.mobileNo = createUserDto.userDetails.MobileNo;
          await this.studentsService.createStudent(savedUser.id, createUserDto.userDetails);
          // const userDetails = this.studentsRepository.create(createUserDto.userDetails as object);
          // userDetails.userId = savedUser.id
          // await this.studentsRepository.save(student);

          // savedUser.userDetails = userDetails;
        } else if (createUserDto.type === 'superUser') {
          await this.teacherService.createTeacher(savedUser.id, createUserDto.superUserDetails);
          // const superUserDetails = this.teachersRepository.create(createUserDto.superUserDetails as object);
          // newUser.SuperUserDetails = superUserDetails; 

        }

   
    
      // return await this.usersRepository.save(newUser)
      return await this.usersRepository.save(savedUser);
    
      } catch(error){
        throw new Error(`Failed to create user:${error.message}`)
      }
    }
  }

