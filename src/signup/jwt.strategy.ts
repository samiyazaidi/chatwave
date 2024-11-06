import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt'; // Adjust the import based on your project structure
import { jwtConstants } from './constants';
import { SignupService } from './signup.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {private readonly signUpService: SignupService;
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants, // Replace with your actual secret key
    });
  }

  async validate(payload: any) {
    console.log('JWT Payload:', payload);
    return {userId:payload.sub,username:payload.username};
    }
  }

