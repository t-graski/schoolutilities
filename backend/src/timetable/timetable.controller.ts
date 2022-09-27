import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddTimeTableDto } from 'src/dto/addTimeTable';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { TimetableService } from './timetable.service';

@Controller('api/timetable')
@UseGuards(RolesGuard)
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) { }

  @UseGuards(JwtAuthGuard)
  //@Roles(Role.Teacher)
  @Post("")
  async createTimetable(@Body() createTimetable: AddTimeTableDto, @Req() request, @Res() response) {
    const result = await this.timetableService.createTimetable(createTimetable, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':classUUID')
  async getTimetable(@Param('classUUID') classUUID: string, @Req() request, @Res() response) {
    const result = await this.timetableService.getTimetable(classUUID, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }
}
