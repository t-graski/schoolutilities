import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Server,
  serverTable,
  classTable,
  timeTableEntryTable,
  subjectTable,
} from './server';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('serverjson')
  async getServerJson(@Req() request): Promise<Server> {
    return await this.appService.getServerJson(request.body.guildId, request.body.token);
  }
}
