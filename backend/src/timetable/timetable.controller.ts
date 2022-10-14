import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddTimeTableDto } from 'src/dto/addTimeTable';
import { AddExamDTO, Exam, UpdateExamDTO } from 'src/entity/exam/exam';
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
  @Get('/timeTableElement/:timeTableElementUUID')
  async getTimeTableElement(@Param('timeTableElementUUID') timeTableElementUUID: string, @Req() request, @Res() response) {
    const result = await this.timetableService.getTimeTableElement(timeTableElementUUID, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }
  @UseGuards(JwtAuthGuard)
  @Post('holiday')
  async addHoliday(@Body() holiday, @Req() request, @Res() response) {
    const result = await this.timetableService.addHoliday(holiday, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }
  @UseGuards(JwtAuthGuard)
  @Get('holiday/:schoolUUID')
  async getHoliday(@Param('schoolUUID') schoolUUID: string, @Req() request, @Res() response) {
    const result = await this.timetableService.getHolidayOfSchool(schoolUUID);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('holiday/:holidayUUID')
  async removeHoliday(@Param('holidayUUID') holidayUUID: string, @Req() request, @Res() response) {
    const result = await this.timetableService.removeHoliday(holidayUUID);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }
  @UseGuards(JwtAuthGuard)
  @Put('holiday/:holidayUUID')
  async updateHoliday(@Param('holidayUUID') holidayUUID: string, @Body() holiday, @Req() request, @Res() response) {
    const result = await this.timetableService.updateHoliday(holidayUUID, holiday);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }
  @UseGuards(JwtAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Post('timeTableGrid')
  async addTimeTableGrid(@Body() timeTableGrid, @Req() request, @Res() response) {
    const result = await this.timetableService.addTimeTableGrid(timeTableGrid, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @Post('/substitution')
  async addSubstitution(@Body() substitution, @Req() request, @Res() response) {
    const result = await this.timetableService.addSubstitution(substitution, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/exam')
  async addExam(@Body() exam: AddExamDTO, @Req() request: Request): Promise<Exam> {
    return this.timetableService.addExam(exam, request);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/exam')
  async updateExam(@Body() exam: UpdateExamDTO, @Req() request: Request): Promise<Exam> {
    return this.timetableService.updateExam(exam, request);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/exam/:examUUID')
  async getExam(@Param('examUUID') examUUID: string, @Req() request: Request): Promise<Exam> {
    return this.timetableService.getExam(examUUID, request);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/exam')
  async getExams(@Req() request: Request): Promise<Exam[]> {
    return null;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/exam/examUUID')
  async deleteExam(@Param('examUUID') examUUID: string, @Req() request: Request): Promise<number> {
    return this.timetableService.deleteExam(examUUID, request);
  }
  @UseGuards(JwtAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/timetable/:classUUID/:dateString')
  async getTimetable(@Param('classUUID') classUUID: string, @Param('dateString') dateString: string, @Req() request, @Res() response) {
    const result = await this.timetableService.getTimetable(classUUID, dateString, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

}
