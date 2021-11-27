import {
  Controller,
  Get,
  Delete,
  Req,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SchoolAdminService } from './schoolAdmin.service';

@Controller('api/schoolAdmin')
export class SchoolAdminController {
  constructor(private readonly schoolAdminService: SchoolAdminService) {}

  // @UseGuards(JwtAuthGuard)
  @Post('/addSchoolConfig')
  async addSchoolConfig(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.addSchoolConfig(request.body);
    return response.status(result.status).json(result?.data);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('/addDepartment')
  async addDepartment(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.addDepartment(request.body);
    return response.status(result.status).json(result?.data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/removeDepartment')
  async removeDepartment(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.removeDepartment(
      request.body?.departmentId,
    );
    return response.status(result.status).json(result?.message);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/updateDepartment')
  async updateDepartment(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.updateDepartment(request.body);
    return response.status(result.status).json(result?.message);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/addClass')
  async addClass(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.addClass(request.body);
    return response.status(result.status).json(result?.data);
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
}
