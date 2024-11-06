import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PassService } from './pass/pass.service';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }
  
}
