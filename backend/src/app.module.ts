import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { UsersController } from './users/users.controller';

@Module({
  imports: [],
  controllers: [AppController, AuthController, UsersController],
  providers: [AppService],
})
export class AppModule {}
