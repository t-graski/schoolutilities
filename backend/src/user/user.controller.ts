import {
  Controller,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { UserService } from './user.service';

@Controller('api/user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/requestPasswordReset')
  async requestPasswordReset(@Req() request, @Res() response) {
    const result = await this.userService.requestPasswordReset(request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @Post('/passwordReset')
  async passwordReset(@Req() request, @Res() response) {
    const result = await this.userService.passwordReset(request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }


  @UseGuards(JwtAuthGuard)
  @Post('/requestEmailChange')
  async requestEmailChange(@Req() request, @Res() response) {
    const result = await this.userService.requestEmailChange(request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @Post('/verifyEmailChange')
  async verifyEmailChange(@Req() request, @Res() response) {
    const result = await this.userService.verifyEmailChange(request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getSchools')
  async getSchools(@Res() response, @Req() request) {
    const jwt = request.headers.authorization.split(' ')[1];
    const result = await this.userService.getSchools(jwt);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Res() response, @Req() request) {
    const jwt = request.headers.authorization.split(' ')[1];
    const result = await this.userService.getProfile(jwt);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/publicProfile')
  async getPublicProfile(@Res() response, @Req() request) {
    const result = await this.userService.getPublicProfile(request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/updateUserSettings')
  async updateUserSettings(@Req() request, @Res() response) {
    const result = await this.userService.updateUserSettings(request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/updateAppearance')
  async updateAppearance(@Req() request, @Res() response) {
    const result = await this.userService.updateAppearance(request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }


  @UseGuards(JwtAuthGuard)
  @Put('/updatePublicProfile')
  async updatePublicProfile(@Req() request, @Res() response) {
    const result = await this.userService.updatePublicProfile(request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }
}
