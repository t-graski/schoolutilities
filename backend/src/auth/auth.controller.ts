import {
  Controller,
  Get,
  Req,
  Patch,
  Res,
  HttpStatus,
  Post,
  Redirect,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async registerUser(@Req() request, @Res() response): Promise<string> {
    const registerUserStatus = await this.authService.registerUser(
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

  @UseGuards(AuthGuard('local'))
  @Get('login')
  async loginUser(@Req() request, @Res() response): Promise<any> {
    return request.user;
    // const loginStatus = await this.authService.loginUser(request.body);
    // if (loginStatus.statusCode == HttpStatus.OK) {
    //   return response.status(HttpStatus.OK).send(loginStatus.token);
    // } else if (loginStatus.statusCode == HttpStatus.NOT_FOUND) {
    //   return response.status(HttpStatus.NOT_FOUND).send();
    // } else if (loginStatus.statusCode == HttpStatus.FORBIDDEN) {
    //   return response.status(HttpStatus.FORBIDDEN).send();
    // } else {
    //   return response.status(HttpStatus.BAD_REQUEST).send();
    // }
  }
}
