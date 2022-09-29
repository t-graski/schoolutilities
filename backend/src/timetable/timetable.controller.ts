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

  @Post('holiday')
  async addHoliday(@Body() holiday, @Req() request, @Res() response) {
    const result = await this.timetableService.addHoliday(holiday, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @Get('holiday/:schoolUUID')
  async getHoliday(@Param('schoolUUID') schoolUUID: string, @Req() request, @Res() response) {
    const result = await this.timetableService.getHolidayOfSchool(schoolUUID);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @Post('/exam')
  async addExam(@Body() exam, @Req() request, @Res() response) {
    const result = await this.timetableService.addExam(exam, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':classUUID/:dateString')
  async getTimetable(@Param('classUUID') classUUID: string, @Param('dateString') dateString: string, @Req() request, @Res() response) {
    const result = await this.timetableService.getTimetable(classUUID, dateString, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }
}
