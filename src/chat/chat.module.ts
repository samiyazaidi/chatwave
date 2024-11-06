import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ServeStaticModule } from '@nestjs/serve-static';     //npm install @nestjs/serve-static

import { join } from 'path';

@Module({
    imports: [
        ServeStaticModule.forRoot({
          rootPath: join(__dirname, '..', 'public'),
        }),
      ],
    providers:[ChatGateway]
})
export class ChatModule {}
