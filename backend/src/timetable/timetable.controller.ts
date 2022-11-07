import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddExamDTO, Exam, UpdateExamDTO } from 'src/entity/exam/exam';
import { AddHolidayDTO, Holiday, UpdateHolidayDTO } from 'src/entity/holiday/holiday';
import { AddTimeTableElementDTO, TimeTableElement, UpdateTimeTableElementDTO } from 'src/entity/time-table-element/timeTableElement';
import { ExamInterceptor } from 'src/notification/exam.interceptor';
import { RolesGuard } from 'src/roles/roles.guard';
import { TimetableService } from './timetable.service';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('timetable')
@Controller('api/timetable')
@UseGuards(RolesGuard)
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) { }

  /*
  @UseGuards(JwtAuthGuard)
  //@Roles(Role.Teacher)
  @Post("")
  async createTimetable(@Body() createTimetable: any, @Req() request, @Res() response) {
    const result = await this.timetableService.createTimetable(createTimetable, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  */

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: AddTimeTableElementDTO })
  @ApiOperation({ summary: 'Add timetableelement' })
  @ApiCreatedResponse({ type: TimeTableElement })
  @Post('/element')
  async addTimeTableElement(@Body() timeTableElement, @Req() request): Promise<TimeTableElement> {
   return this.timetableService.addTimeTableElement(timeTableElement, request);

  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UpdateTimeTableElementDTO })
  @ApiOperation({ summary: 'Update timetableelement' })
  @ApiOkResponse({ type: TimeTableElement })
  @Put('/element')
  async updateTimeTableElement(@Body() timeTableElement, @Req() request: Request): Promise<TimeTableElement> {
    return this.timetableService.updateTimeTableElement(timeTableElement, request);
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'elementUUID', type: String })
  @ApiParam({ name: 'date', type: String })
  @ApiOperation({ summary: 'Get TimetableElement' })
  @ApiOkResponse({ type: TimeTableElement })
  @Get('/element/:elementUUID/:date')
  async getTimeTableElementDetailed(@Param('elementUUID') elementUUID: string, @Param('date') date: string, @Req() request): Promise<TimeTableElement> {
    return this.timetableService.getTimeTableElementDetailed(elementUUID, date, request);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/element/:elementUUID')
  async deleteTimeTableElement(@Param('elementUUID') elementUUID: string, @Req() request: Request, @Res() response) {
    const result = await this.timetableService.deleteTimeTableElement(elementUUID, request);
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

  @ApiOperation({ summary: 'Add a holiday to a school' })
  @ApiCreatedResponse({ type: Holiday })
  @ApiBody({ type: AddHolidayDTO })
  @UseGuards(JwtAuthGuard)
  @Post('/holiday')
  async addHoliday(@Body() holiday: AddHolidayDTO, @Req() request): Promise<Holiday> {
    return this.timetableService.addHoliday(holiday, request);

  }

  @ApiOperation({ summary: 'Get all holidays of a school' })
  @ApiOkResponse({ type: [Holiday] })
  @ApiParam({ name: 'schoolUUID', type: String })
  @UseGuards(JwtAuthGuard)
  @Get('/holiday/:schoolUUID')
  async getHoliday(@Param('schoolUUID') schoolUUID: string): Promise<Holiday[] | Holiday> {
    return this.timetableService.getHolidayOfSchool(schoolUUID);
  }

  @ApiOperation({ summary: 'Delete a holiday' })
  @ApiParam({ name: 'holidayUUID', type: String })
  @ApiOkResponse({ type: Number })
  @UseGuards(JwtAuthGuard)
  @Delete('/holiday/:holidayUUID')
  async removeHoliday(@Param('holidayUUID') holidayUUID: string): Promise<Holiday> {
    return this.timetableService.removeHoliday(holidayUUID);
  }

  @ApiOperation({ summary: 'Update a holiday of a school' })
  @ApiBody({ type: UpdateHolidayDTO })
  @ApiOkResponse({ type: Holiday })
  @UseGuards(JwtAuthGuard)
  @Put('/holiday')
  async updateHoliday(@Body() holiday: UpdateHolidayDTO, request: Request): Promise<Holiday> {
    return this.timetableService.updateHoliday(holiday, request);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/grid')
  async addTimeTableGrid(@Body() timeTableGrid, @Req() request, @Res() response) {
    const result = await this.timetableService.addTimeTableGrid(timeTableGrid, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @Post('/omit')
  async addOmit(@Body() omit, @Req() request, @Res() response) {
    const result = await this.timetableService.addOmit(omit, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/omit/:timeTableElementUUID')
  async removeOmit(@Param('timeTableElementUUID') timeTableElementUUID: string, @Req() request, @Res() response) {
    const result = await this.timetableService.removeOmit(timeTableElementUUID, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }
  xw
  @UseGuards(JwtAuthGuard)
  @Delete('/grid/:schoolUUId')
  async deleteTimeTableGrid(@Param('schoolUUId') schoolUUId: string, @Req() request, @Res() response) {
    const result = await this.timetableService.deleteTimeTableGrid(schoolUUId, request);
  }


  @UseGuards(JwtAuthGuard)
  @Get('/grid/:schoolUUID')
  async getTimeTableGrid(@Param('schoolUUID') schoolUUID: string, @Req() request, @Res() response) {
    const result = await this.timetableService.getTimeTableGrid(schoolUUID, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/grid')
  async updateTimeTableGrid(@Body() timeTableGrid, @Req() request, @Res() response) {
    const result = await this.timetableService.editTimeTableGrid(timeTableGrid, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/grid/break')
  async removeBreak(@Body() breakUUID, @Req() request, @Res() response) {
    const result = await this.timetableService.removeBreak(breakUUID, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/grid/break')
  async updateBreak(@Body() breakData, @Req() request, @Res() response) {
    const result = await this.timetableService.updateBreak(breakData, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/grid/break')
  async addBreak(@Body() breakData, @Req() request, @Res() response) {
    const result = await this.timetableService.addBreak(breakData, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/freeRooms')
  async getFreeRooms(@Req() request: Request, @Res() response) {
    const result = await this.timetableService.getFreeRooms();
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/substitution')
  async addSubstitution(@Body() substitution, @Req() request, @Res() response) {
    const result = await this.timetableService.addSubstitution(substitution, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/substitution/:elementUUID/:date')
  async getSubstitution(@Param('elementUUID') elementUUID: string, @Param('date') date: string, @Req() request, @Res() response) {
    const result = await this.timetableService.getSubstitutionForTimeTableElement(elementUUID, date, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/substitution/:substitutionUUID')
  async removeSubstitution(@Param('substitutionUUID') substitutionUUID: string, @Req() request, @Res() response) {
    const result = await this.timetableService.deleteSubstitution(substitutionUUID, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/substitution')
  async updateSubstitution(@Body() substitution, @Req() request, @Res() response) {
    const result = await this.timetableService.updateSubstitution(substitution, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseInterceptors(ExamInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post('/exam')
  async addExam(@Body() exam: AddExamDTO, @Req() request: Request) {
    return this.timetableService.addExam(exam, request);
  }

  @UseInterceptors(ExamInterceptor)
  @UseGuards(JwtAuthGuard)
  @Put('/exam')
  async updateExam(@Body() exam: UpdateExamDTO, @Req() request: Request) {
    return this.timetableService.updateExam(exam, request);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/exam/:examUUID')
  async getExam(@Param('examUUID') examUUID: string, @Req() request: Request) {
    return this.timetableService.getExam(examUUID, request);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/exam')
  async getExams(@Req() request: Request): Promise<Exam[] | Exam> {
    return this.timetableService.getExamsOfUser(request);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/exams/:schoolUUID')
  async getExamsOfSchool(@Param('schoolUUID') schoolUUID: string, @Req() request: Request) {
    return this.timetableService.getExamsOfSchool(schoolUUID, request);
  }

  @UseInterceptors(ExamInterceptor)
  @UseGuards(JwtAuthGuard)
  @Delete('/exam/:examUUID')
  async deleteExam(@Param('examUUID') examUUID: string, @Req() request: Request): Promise<Exam> {
    return this.timetableService.deleteExam(examUUID, request);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/timetable/:classUUID/:dateString')
  async getTimetable(@Param('classUUID') classUUID: string, @Param('dateString') dateString: string, @Req() request, @Res() response) {
    const result = await this.timetableService.getTimetable(classUUID, dateString, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }
}
