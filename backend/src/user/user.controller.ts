import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/roles/roles.guard';
import { UsersService } from 'src/users/users.service';
import { UserService } from './user.service';

@Controller('api/user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(RolesGuard)
  @Post('/changePassword')
  async addDepartments(@Req() request, @Res() response) {
    const jwt = request.headers.authorization.split(' ')[1];
    const result = await this.userService.changePassword(request.body, jwt);
    return response.status(result.status).json(result?.message);
  }

  @Post('/changeEmail')
  async changeEmail(@Req() request, @Res() response) {
    const jwt = request.headers.authorization.split(' ')[1];
    const result = await this.userService.changeEmail(request.body, jwt);
    return response.status(result.status).json(result?.message);
  }

  @Get('/getSchools')
  async getSchools(@Res() response, @Req() request) {
    const jwt = request.headers.authorization.split(' ')[1];
    const result = await this.userService.getSchools(jwt);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }
}
