import { Controller,Post,Body, UseGuards, Get,Request, Sse } from '@nestjs/common';
import { SignupService } from './signup.service';
import { OnboardingDto } from '../user/dto/create-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { SignInDto } from './dto/signin.dto';
import { interval, map, Observable } from 'rxjs';

@Controller('users')
export class SignupController {
    constructor(
        private readonly signupService:SignupService
    ){}
    @Post('/register')
    async register(@Body() createUserDto: OnboardingDto) {
      await this.signupService.createUser(createUserDto);
      return { message: 'User registered successfully' };
    }
    
    @Post('/signin')
  signIn(@Body() signInDto:SignInDto) {
    return this.signupService.signIn(signInDto.email, signInDto.password);
  }
  
  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
