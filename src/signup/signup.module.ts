import { forwardRef, Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Onboarding } from '../user/entities/user.entity';
import { PassService } from '../pass/pass.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { Users } from '../students/entities/student.entity';
import { SuperUsers } from '../teachers/entities/teacher.entity';
import { UserType } from '../user/entities/userType.entity';
import { StudentsService } from '../students/students.service';
import { TeachersService } from '../teachers/teachers.service';
import { Courses } from '../user/entities/courses.entity';
import { ChatGateway } from '../chat/chat.gateway';

@Module({imports:[
  TypeOrmModule.forFeature([Onboarding, Users, SuperUsers, UserType,Courses]),
  JwtModule.register({
    secret:  jwtConstants.secret,
    signOptions: { expiresIn: '1h' },
  }),
],
  providers: [SignupService,PassService,JwtService,StudentsService,TeachersService],
  controllers: [SignupController],
  exports: [SignupService, TypeOrmModule,JwtModule],
})
export class SignupModule {}
