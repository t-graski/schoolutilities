import {
  Controller,
  Get,
  Req,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerUser(@Req() request, @Res() response): Promise<string> {
    const registerUserStatus = await this.usersService.registerUser(
      request.body,
    );
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

  @Post('activateAccount')
  async activateAccount(
    @Req() request,
    @Res() response,
    @Body() body,
  ): Promise<any> {
    const activateAccountStatus = await this.usersService.activateAccount(
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
