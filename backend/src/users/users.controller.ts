import { Controller, Get, Req, Res, HttpStatus, Post } from '@nestjs/common';
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
}
