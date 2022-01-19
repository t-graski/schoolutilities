import {
  Controller,
  Get,
  Delete,
  Req,
  Res,
  Post,
  Put,
  UseGuards,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { SchoolAdminService } from './schoolAdmin.service';

@Controller('api/schoolAdmin')
@UseGuards(RolesGuard)
export class SchoolAdminController {
  constructor(private readonly schoolAdminService: SchoolAdminService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Verified)
  @Post('/addSchoolConfig')
  async addSchoolConfig(@Req() request, @Res() response) {
    const jwt = request.headers.authorization.split(' ')[1];
    const result = await this.schoolAdminService.addSchoolConfig(
      request.body,
      jwt,
    );
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  // @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Post('/department')
  async addDepartment(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.addDepartment(request.body);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  // @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Post('/departments')
  async addDepartments(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.addDepartments(request.body);
    return response.status(result.status).json(result?.message);
  }

  // @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Delete('/department')
  async removeDepartment(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.removeDepartment(request.body);
    return response
      .setHeader('Access-Control-Allow-Origin', '*')
      .status(result.status)
      .json(result?.message);
  }

  // @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Put('/department')
  async updateDepartment(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.updateDepartment(request.body);
    return response.status(result.status).json(result?.message);
  }

  // @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Get('/departments/:schoolUUID')
  async getDepartments(@Param() params, @Res() response) {
    const result = await this.schoolAdminService.getDepartments(
      params.schoolUUID,
    );
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  // @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Post('/class')
  async addClass(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.addClass(request.body);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  // @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Delete('/class')
  async removeClass(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.removeClass(
      request.body.classUUID,
    );
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  // @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Put('/class')
  async updateClass(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.updateClass(request.body);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  // @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Get('/classes/:schoolUUID')
  async getClasses(@Param() params, @Res() response) {
    const result = await this.schoolAdminService.getClasses(params.schoolUUID);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  // @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Post('/joinCode')
  async addJoinCode(@Req() request, @Res() response) {
    const jwt = request.headers.authorization.split(' ')[1];
    const result = await this.schoolAdminService.addJoinCode(request.body, jwt);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  // @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Delete('/joinCode')
  async removeJoinCode(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.removeJoinCode(request.body);
    return response.status(result.status).json(result?.message);
  }

  // @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Put('/joinCode')
  async updateJoinCode(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.updateJoinCode(request.body);
    return response.status(result.status).json(result?.message);
  }

  // @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Get('joinCode/:schoolUUID')
  async getJoinCodes(@Param() params, @Res() response) {
    const result = await this.schoolAdminService.getAllJoinCodes(
      params.schoolUUID,
    );
    return response.status(result.status).json(result?.data);
  }

  // @UseGuards(JwtAuthGuard)
  @Roles(Role.Verified)
  @Post('joinSchool')
  async joinSchool(@Req() request, @Res() response) {
    const token = request.headers.authorization.split(' ')[1];
    const result = await this.schoolAdminService.joinSchool(
      request.body.joinCode,
      token,
    );
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  // @UseGuards(JwtAuthGuard)
  @Roles(Role.Student)
  @Post('leaveSchool')
  async leaveSchool(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.leaveSchool(request.body);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @Roles(Role.Admin)
  @Get('/getPersons/:schoolUUID')
  async getPersonsOfSchool(@Param() params, @Res() response) {
    const result = await this.schoolAdminService.getPersonsOfSchool(
      params.schoolUUID,
    );
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @Roles(Role.Admin)
  @Get('userPermissions')
  async getUserPermissions(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.getUserPermissions(
      request.body,
    );
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }
}
