import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  imports: [],
  providers: [MailService],
})
export class MailModule {}
