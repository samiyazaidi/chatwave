import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Onboarding } from './user/entities/user.entity';
import { SignupModule } from './signup/signup.module';
import { PassService } from './pass/pass.service';
import { SignupService } from './signup/signup.service';
import { JwtService } from '@nestjs/jwt';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { Users } from './students/entities/student.entity';
import { SuperUsers } from './teachers/entities/teacher.entity';
import { UserType } from './user/entities/userType.entity';
import { User_has_type } from './user/entities/user_has_type.entity';
import { StudentsService } from './students/students.service';
import { TeachersService } from './teachers/teachers.service';
import { Courses } from './user/entities/courses.entity';
import { PassportModule } from '@nestjs/passport';
import { ChatModule } from './chat/chat.module';

@Module({
  
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Post@2',
    database: 'chatApp',
    entities: [Users, Onboarding, SuperUsers, UserType,User_has_type,Courses ],
    autoLoadEntities:true,
    synchronize: true,
  }), SignupModule, StudentsModule, TeachersModule,ChatModule,
PassportModule.register({
    session:true
  }), ],
  controllers: [AppController],
  providers: [AppService,PassService,SignupService,JwtService, TeachersService],
})
export class AppModule {}
