import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MailModule } from 'src/mail/mail.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule, MailModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
