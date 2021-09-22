import { Controller, Get, Req, Patch, Res, HttpStatus } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AppService } from './app.service';
import { UserServerInfoList } from './server';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('serverjson')
  // async getServerJson(@Req() request): Promise<School> {
  //   return await this.appService.getServerJson(
  //     request.body.guildId,
  //     request.body.token,
  //   );
  // }

  // @Patch('serverjson')
  // async patchServerJson(@Req() request, @Res() response): Promise<string> {
  //   let updateStatus = await this.appService.saveServerJson(
  //     request.body.serverJson,
  //     request.body.token,
  //   );
  //   if (updateStatus) {
  //     return response.status(HttpStatus.OK).send('Update successfull');
  //   }
  // }

  @Get('serverlist')
  @Throttle(5, 1)
  async getServerList(@Req() request): Promise<UserServerInfoList> {
    return await this.appService.getServerList(request.body.token);
  }
}
