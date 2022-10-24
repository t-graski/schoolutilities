import {
  Controller,
  Get,
  Req,
  Res,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtRefreshTokenAuthGuard } from './refreshToken/jwt-refresh-token-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Req() request, @Res() response) {
    const result = await this.authService.registerUser(request.body);
    return response.status(result.status).send(result?.message);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async loginUser(@Req() request, @Res() response) {
    return response
      .status(HttpStatus.OK)
      .send(await this.authService.login(request.body));
  }

  @UseGuards(LocalAuthGuard)
  @Post('/mobile/login')
  async loginMobileUser(@Req() request, @Res() response) {
    return response
      .status(HttpStatus.OK)
      .send(await this.authService.mobileLogin(request.body));
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Req() request, @Res() response) {
    return response.status(HttpStatus.OK).send(request.user);
  }

  @UseGuards(JwtRefreshTokenAuthGuard)
  @Post('/refresh')
  refreshToken(@Req() request, @Res() response) {
    return response.status(HttpStatus.OK).send({ token: request.user });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/roles')
  async getRoles(@Req() request, @Res() response) {
    const result = await this.authService.getRoles(request);
    return response.status(HttpStatus.OK).send(result);
  }
}
