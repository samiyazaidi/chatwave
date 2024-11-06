import { Module } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperUsers } from './entities/teacher.entity';
import { Onboarding } from '../user/entities/user.entity';
import { User_has_type } from '../user/entities/user_has_type.entity';
import { UserType } from '../user/entities/userType.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([SuperUsers, Onboarding, UserType, User_has_type])],
  controllers: [TeachersController],
  providers: [TeachersService]
})
export class TeachersModule {}
