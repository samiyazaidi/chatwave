// import { Injectable } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class PassService {
//     private readonly saltOrRounds = 10;

//     async hashPassword(password: string): Promise<string> {
//       const salt = await bcrypt.genSalt(this.saltOrRounds);
//       return bcrypt.hash(password, salt);
//     }
  
//     async comparePasswords(password: string, hash: string): Promise<boolean> {
//       return bcrypt.compare(password, hash);
//     }
//     async validateUser(password: string, hashedPassword: string): Promise<boolean> {
//       return this.comparePasswords(password, hashedPassword);
//     }
// }

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PassService {
    private readonly saltOrRounds = 10;

    async hashPassword(password: string): Promise<string> {
        try {
            const salt = await bcrypt.genSalt(this.saltOrRounds);
            return await bcrypt.hash(password, salt);
        } catch (error) {
            throw new Error(`Failed to hash password: ${error.message}`);
        }
    }

    async comparePasswords(password: string, hash: string): Promise<boolean> {
        try {
            return await bcrypt.compare(password, hash);
        } catch (error) {
            throw new Error(`Failed to compare passwords: ${error.message}`);
        }
    }

    async validateUser(password: string, hashedPassword: string): Promise<boolean> {
        return this.comparePasswords(password, hashedPassword);
    }
}

