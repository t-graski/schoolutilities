import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddTimeTableDto } from 'src/dto/addTimeTable';
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

  @Get('/timeTableElement/:timeTableElementUUID')
  async getTimeTableElement(@Param('timeTableElementUUID') timeTableElementUUID: string, @Req() request, @Res() response) {
    const result = await this.timetableService.getTimeTableElement(timeTableElementUUID, request);
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

  @Delete('holiday/:holidayUUID')
  async removeHoliday(@Param('holidayUUID') holidayUUID: string, @Req() request, @Res() response) {
    const result = await this.timetableService.removeHoliday(holidayUUID);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @Put('holiday/:holidayUUID')
  async updateHoliday(@Param('holidayUUID') holidayUUID: string, @Body() holiday, @Req() request, @Res() response) {
    const result = await this.timetableService.updateHoliday(holidayUUID, holiday);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Post('timeTableGrid')
  async addTimeTableGrid(@Body() timeTableGrid, @Req() request, @Res() response) {
    const result = await this.timetableService.addTimeTableGrid(timeTableGrid, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @Post('substitution')
  async addSubstitution(@Body() substitution, @Req() request, @Res() response) {
    const result = await this.timetableService.addSubstitution(substitution, request);
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
  @Get('/timetable/:classUUID/:dateString')
  async getTimetable(@Param('classUUID') classUUID: string, @Param('dateString') dateString: string, @Req() request, @Res() response) {
    const result = await this.timetableService.getTimetable(classUUID, dateString, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  //crud for subject
  @UseGuards(JwtAuthGuard)
  @Get('subject/:subjectUUID')
  async getSubject(@Param('subjectUUID') subjectUUID: string, @Req() request, @Res() response) {
    const result = await this.timetableService.getSubject(subjectUUID, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Get('subjects/:schoolUUID')
  async getSubjects(@Param('schoolUUID') schoolUUID: string, @Req() request, @Res() response) {
    const result = await this.timetableService.getSubjects(schoolUUID, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Post('subject')
  async addSubject(@Body() subject, @Req() request, @Res() response) {
    const result = await this.timetableService.addSubject(subject, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Put('subject')
  async updateSubject(@Body() subject, @Req() request, @Res() response) {
    const result = await this.timetableService.updateSubject(subject, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('subject/:subjectUUID')
  async removeSubject(@Param('subjectUUID') subjectUUID: string, @Req() request, @Res() response) {
    const result = await this.timetableService.removeSubject(subjectUUID, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  //crud for rooms
  @UseGuards(JwtAuthGuard)
  @Get('room/:roomUUID')
  async getRoom(@Param('roomUUID') roomUUID: string, @Req() request, @Res() response) {
    const result = await this.timetableService.getRoom(roomUUID, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Get('rooms/:schoolUUID')
  async getRooms(@Param('schoolUUID') schoolUUID: string, @Req() request, @Res() response) {
    const result = await this.timetableService.getRooms(schoolUUID, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Post('room')
  async addRoom(@Body() room, @Req() request, @Res() response) {
    const result = await this.timetableService.addRoom(room, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Put('room')
  async updateRoom(@Body() room, @Req() request, @Res() response) {
    const result = await this.timetableService.updateRoom(room, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('room/:roomUUID')
  async removeRoom(@Param('roomUUID') roomUUID: string, @Req() request, @Res() response) {
    const result = await this.timetableService.removeRoom(roomUUID, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }
}
