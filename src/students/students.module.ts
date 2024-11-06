import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { Users } from './entities/student.entity';
import { Onboarding } from '../user/entities/user.entity';
import { UserType } from '../user/entities/userType.entity';
import { User_has_type } from '../user/entities/user_has_type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignupService } from '../signup/signup.service';
import { PassService } from '../pass/pass.service';
import { Courses } from '../user/entities/courses.entity';

@Module({
  imports:[
  TypeOrmModule.forFeature([Onboarding, Users, UserType, User_has_type, Courses])],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
