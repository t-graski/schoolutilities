import {
  Controller,
  Get,
  Delete,
  Req,
  Res,
  Post,
  Put,
  UseGuards,
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
  @Post('/addSchoolConfig')
  async addSchoolConfig(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.addSchoolConfig(request.body);
    return response.status(result.status).json(result?.message);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('/addDepartment')
  //@Roles(Role.Admin)
  async addDepartment(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.addDepartment(request.body);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('/addDepartments')
  async addDepartments(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.addDepartments(request.body);
    return response.status(result.status).json(result?.message);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete('/removeDepartment')
  async removeDepartment(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.removeDepartment(request.body);
    return response.status(result.status).json(result?.message);
  }

  // @UseGuards(JwtAuthGuard)
  @Put('/updateDepartment')
  async updateDepartment(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.updateDepartment(request.body);
    return response.status(result.status).json(result?.message);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/departments')
  @Roles(Role.Student)
  async getDepartments(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.getDepartments(request.body);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/addClass')
  async addClass(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.addClass(request.body);
    return response.status(result.status).json(result?.message);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/removeClass')
  async removeClass(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.removeClass(
      request.body?.classId,
    );
    return response.status(result.status).json(result?.message);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/updateClass')
  async updateClass(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.updateClass(request.body);
    return response.status(result.status).json(result?.message);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/joinCode')
  async addJoinCode(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.addJoinCode(request.body);
    return response.status(result.status).json(result?.message);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/joinCode')
  async removeJoinCode(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.removeJoinCode(request.body);
    return response.status(result.status).json(result?.message);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/joinCode')
  async updateJoinCode(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.updateJoinCode(request.body);
    return response.status(result.status).json(result?.message);
  }

  @UseGuards(JwtAuthGuard)
  @Get('joinCode')
  async getJoinCodes(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.getAllJoinCodes(request.body);
    return response.status(result.status).json(result?.data);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('joinSchool')
  async joinSchool(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.joinSchool(request.body);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('leaveSchool')
  async leaveSchool(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.leaveSchool(request.body);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

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
