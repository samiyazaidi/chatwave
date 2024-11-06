import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Onboarding } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { SuperUsers } from './entities/teacher.entity';

@Injectable()
export class TeachersService {
    constructor(
        @InjectRepository(Onboarding)
        private readonly usersRepository: Repository<Onboarding>,
        @InjectRepository(Onboarding)
        private readonly teachersRepository: Repository<SuperUsers>){}
    async createTeacher(id:string,createTeacherDto:CreateTeacherDto){
    const user = await this.usersRepository.findOne({
        where: {id }
    })
    if(user){
        const details = {
        userId : id,
        employeeid : createTeacherDto.EmployeeId,
        mobileNo: createTeacherDto.MobileNo,
        }
    
    return this.teachersRepository.save(details);
    }
}
}
