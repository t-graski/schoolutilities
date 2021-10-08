import {
  Controller,
  Get,
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

@Controller('api/schooladmin')
export class SchoolAdminController {
  constructor(private readonly schoolAdminService: SchoolAdminService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/addSchoolConfig')
  async addSchoolConfig(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.addSchoolConfig(request.body);
    return response.status(result.status).json(result?.data);
  }
}
