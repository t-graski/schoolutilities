
import { Controller, Get, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/roles/roles.guard';
import { UserService } from './user.service';

@Controller('api/user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  // @UseGuards(RolesGuard)
  @Post('/changePassword')
  async addDepartments(@Req() request, @Res() response) {
    const jwt = request.headers.authorization.split(' ')[1];
    const result = await this.userService.changePassword(request.body, jwt);
    return response.status(result.status).json(result?.message);
  }

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

  @Post('/changeEmail')
  async changeEmail(@Req() request, @Res() response) {
    const jwt = request.headers.authorization.split(' ')[1];
    const result = await this.userService.changeEmail(request.body, jwt);
    return response.status(result.status).json(result?.message);
  }

  @Post('/activateNewEmail')
  async activateNewEmail(@Req() request, @Res() response) {
    const result = await this.userService.activateNewEmail(request.body.token);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @Get('/getSchools')
  async getSchools(@Res() response, @Req() request) {
    const jwt = request.headers.authorization.split(' ')[1];
    const result = await this.userService.getSchools(jwt);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @Get('/profile')
  async getProfile(@Res() response, @Req() request) {
    const jwt = request.headers.authorization.split(' ')[1];
    const result = await this.userService.getProfile(jwt);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @Get('/publicProfile')
  async getPublicProfile(@Res() response, @Req() request) {
    const result = await this.userService.getPublicProfile(request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @Put('/updateUserSettings')
  async updateUserSettings(@Req() request, @Res() response) {
    const result = await this.userService.updateUserSettings(request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @Put('/updatePublicProfile')
  async updatePublicProfile(@Req() request, @Res() response) {
    const result = await this.userService.updatePublicProfile(request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }
}
