import {
  Controller,
  Get,
  Req,
  Patch,
  Res,
  HttpStatus,
  Post,
  Redirect,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  Server,
  serverTable,
  classTable,
  timeTableEntryTable,
  subjectTable,
  UserServerInfo,
  UserServerInfoList,
} from './server';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('serverjson')
  // async getServerJson(@Req() request): Promise<Server> {
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

  // @Get('serverlist')
  // async getServerList(@Req() request): Promise<UserServerInfoList> {
  //   return await this.appService.getServerList(request.body.token);
  // }

  @Post('register')
  async registerUser(@Req() request, @Res() response): Promise<string> {
    const registerUserStatus = await this.appService.registerUser(request.body);
    if (
      typeof registerUserStatus == 'string' &&
      registerUserStatus == 'successfull'
    ) {
      return response.status(HttpStatus.OK).send('User registered');
    } else if (
      typeof registerUserStatus == 'string' &&
      registerUserStatus == 'exists'
    ) {
      return response.status(HttpStatus.CONFLICT).send('User already exists');
    }
  }

  @Get('login')
  async loginUser(@Req() request, @Res() response): Promise<any> {
    const loginStatus = await this.appService.loginUser(request.body);
    if (loginStatus.statusCode == HttpStatus.OK) {
      return response.status(HttpStatus.OK).send(loginStatus.token);
    } else if (loginStatus.statusCode == HttpStatus.NOT_FOUND) {
      return response.status(HttpStatus.NOT_FOUND).send();
    } else if (loginStatus.statusCode == HttpStatus.FORBIDDEN) {
      return response.status(HttpStatus.FORBIDDEN).send();
    } else {
      return response.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Post('activateAccount')
  async activateAccount(@Req() request, @Res() response): Promise<any> {
    const activateAccountStatus = await this.appService.activateAccount(
      request.body.token,
    );
    if (activateAccountStatus == HttpStatus.OK) {
      return response
        .setHeader('Access-Control-Allow-Origin', '*')
        .status(HttpStatus.OK)
        .send('activated');
    } else {
      return response.status(HttpStatus.NOT_FOUND).send('failed');
    }
  }
}
