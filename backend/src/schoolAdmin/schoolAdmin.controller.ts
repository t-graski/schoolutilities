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
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { SchoolAdminService } from './schoolAdmin.service';
import { Request } from 'express'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { AddSchoolSubjectDTO, SchoolSubject, UpdateSchoolSubjectDTO } from 'src/entity/subject/schoolSubject';
import { AddSchoolRoomDTO, SchoolRoom, UpdateSchoolRoomDTO } from 'src/entity/school-room/schoolRoom';

@Controller('/api/schoolAdmin')
@UseGuards(RolesGuard)
export class SchoolAdminController {
  constructor(private readonly schoolAdminService: SchoolAdminService) { }

  @UseGuards(JwtAuthGuard)
  // @Roles(Role.Student)
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

  @UseGuards(JwtAuthGuard)
  @Post('/department')
  // @Roles(Role.Admin)
  async addDepartment(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.addDepartment(request.body);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/departments')
  // @Roles(Role.Admin)
  async addDepartments(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.addDepartments(request.body);
    return response.status(result.status).json(result?.message);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/department')
  // @Roles(Role.Admin)
  async removeDepartment(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.removeDepartment(request.body);
    return response
      .setHeader('Access-Control-Allow-Origin', '*')
      .status(result.status)
      .json(result?.message);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/department')
  // @Roles(Role.Admin)
  async updateDepartment(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.updateDepartment(request.body);
    return response.status(result.status).json(result?.message);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/departments/:schoolUUID')
  // @Roles(Role.Student)
  async getDepartments(@Param() params, @Res() response) {
    const result = await this.schoolAdminService.getDepartments(
      params.schoolUUID,
    );
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/class')
  // @Roles(Role.Admin)
  async addClass(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.addClass(request.body);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/class')
  // @Roles(Role.Admin)
  async removeClass(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.removeClass(
      request.body.classUUID,
    );
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/class')
  // @Roles(Role.Admin)
  async updateClass(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.updateClass(request.body);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/classes/:schoolUUID')
  // @Roles(Role.Student)
  async getClasses(@Param() params, @Res() response) {
    const result = await this.schoolAdminService.getClasses(params.schoolUUID);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/joinCode')
  // @Roles(Role.Admin)
  async addJoinCode(@Req() request, @Res() response) {
    const jwt = request.headers.authorization.split(' ')[1];
    const result = await this.schoolAdminService.addJoinCode(request.body, jwt);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/joinCode')
  // @Roles(Role.Admin)
  async removeJoinCode(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.removeJoinCode(request.body);
    return response.status(result.status).json(result?.message);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/joinCode')
  // @Roles(Role.Admin)
  async updateJoinCode(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.updateJoinCode(request.body);
    return response.status(result.status).json(result?.message);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/joinCode/:schoolUUID')
  // @Roles(Role.Admin)
  async getJoinCodes(@Param() params, @Res() response) {
    const result = await this.schoolAdminService.getAllJoinCodes(
      params.schoolUUID,
    );
    return response.status(result.status).json(result?.data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/joinSchool')
  // @Roles(Role.Verified)
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

  @UseGuards(JwtAuthGuard)
  @Post('/leaveSchool')
  // @Roles(Role.Student)
  async leaveSchool(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.leaveSchool(request.body);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getPersons/:schoolUUID')
  // @Roles(Role.Student)
  async getPersonsOfSchool(@Param() params, @Res() response) {
    const result = await this.schoolAdminService.getPersonsOfSchool(
      params.schoolUUID,
    );
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/teachers/:schoolUUID')
  // @Roles(Role.Student)
  async getTeachersOfSchool(@Param('schoolUUID') schoolUUID: string, @Res() response) {
    const result = await this.schoolAdminService.getTeachersOfSchool(schoolUUID);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/userPermissions')
  async getUserPermissions(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.getUserPermissions(
      request.body,
    );
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @ApiOperation({ summary: 'Add a subject to a school' })
  @ApiCreatedResponse({ type: SchoolSubject })
  @ApiBody({ type: AddSchoolSubjectDTO })
  @UseGuards(JwtAuthGuard)
  @Post('/subject')
  async addSubject(@Body() subject: AddSchoolSubjectDTO, @Req() request: Request): Promise<SchoolSubject> {
    return this.schoolAdminService.addSubject(subject, request);
  }

  @ApiOperation({ summary: 'Get a subject of a school' })
  @ApiOkResponse({ type: SchoolSubject })
  @ApiParam({ name: 'subjectUUID', type: String })
  @UseGuards(JwtAuthGuard)
  @Get('/subject/:subjectUUID')
  async getSubject(@Param('subjectUUID') subjectUUID: string, @Req() request): Promise<SchoolSubject> {
    return this.schoolAdminService.getSubject(subjectUUID, request);
  }

  @ApiOperation({ summary: 'Get all subjects of a school' })
  @ApiOkResponse({ type: [SchoolSubject] })
  @ApiParam({ name: 'schoolUUID', type: String })
  @UseGuards(JwtAuthGuard)
  @Get('/subjects/:schoolUUID')
  async getSubjects(@Param('schoolUUID') schoolUUID: string, @Req() request: Request): Promise<SchoolSubject[]> {
    return this.schoolAdminService.getSubjects(schoolUUID, request);
  }

  @ApiOperation({ summary: 'Update a subject of a school' })
  @ApiOkResponse({ type: SchoolSubject })
  @ApiBody({ type: UpdateSchoolSubjectDTO })
  @UseGuards(JwtAuthGuard)
  @Put('/subject')
  async updateSubject(@Body() subject: UpdateSchoolSubjectDTO, @Req() request: Request): Promise<SchoolSubject> {
    return this.schoolAdminService.updateSubject(subject, request);
  }

  @ApiOperation({ summary: 'Delete a subject of a school' })
  @ApiOkResponse({ type: Number })
  @ApiParam({ name: 'subjectUUID', type: String })
  @UseGuards(JwtAuthGuard)
  @Delete('/subject/:subjectUUID')
  async removeSubject(@Param('subjectUUID') subjectUUID: string, @Req() request, @Res() response): Promise<number> {
    return this.schoolAdminService.removeSubject(subjectUUID, request);
  }

  @ApiOperation({ summary: 'Get a room of a school' })
  @ApiOkResponse({ type: SchoolRoom })
  @ApiParam({ name: 'roomUUID', type: String })
  @UseGuards(JwtAuthGuard)
  @Get('/room/:roomUUID')
  async getRoom(@Param('roomUUID') roomUUID: string, @Req() request: Request): Promise<SchoolRoom> {
    return this.schoolAdminService.getRoom(roomUUID, request);
  }

  @ApiOperation({ summary: 'Get all rooms of a school' })
  @ApiOkResponse({ type: [SchoolRoom] })
  @ApiParam({ name: 'schoolUUID', type: String })
  @UseGuards(JwtAuthGuard)
  @Get('/rooms/:schoolUUID')
  async getRooms(@Param('schoolUUID') schoolUUID: string, @Req() request: Request): Promise<SchoolRoom[]> {
    return this.schoolAdminService.getRooms(schoolUUID, request);
  }

  @ApiOperation({ summary: 'Add a room to a school' })
  @ApiCreatedResponse({ type: SchoolRoom })
  @ApiBody({ type: AddSchoolRoomDTO })
  @UseGuards(JwtAuthGuard)
  @Post('/room')
  async addRoom(@Body() room: AddSchoolRoomDTO, @Req() request: Request): Promise<SchoolRoom> {
    return this.schoolAdminService.addRoom(room, request);
  }

  @ApiOperation({ summary: 'Update a room of a school' })
  @ApiOkResponse({ type: SchoolRoom })
  @ApiBody({ type: UpdateSchoolRoomDTO })
  @UseGuards(JwtAuthGuard)
  @Put('room')
  async updateRoom(@Body() room: UpdateSchoolRoomDTO, @Req() request: Request): Promise<SchoolRoom> {
    return this.schoolAdminService.updateRoom(room, request);
  }

  @ApiOperation({ summary: 'Delete a room of a school' })
  @ApiOkResponse({ type: Number })
  @ApiParam({ name: 'roomUUID', type: String })
  @UseGuards(JwtAuthGuard)
  @Delete('room/:roomUUID')
  async removeRoom(@Param('roomUUID') roomUUID: string, @Req() request: Request): Promise<number> {
    return this.schoolAdminService.removeRoom(roomUUID, request);
  }


  /**
   * @deprecated
   * @param params 
   * @param response 
   * @param request 
   * @returns 
   */
  @ApiOperation({ deprecated: true })
  @UseGuards(JwtAuthGuard)
  @Get('/information/:schoolUUID')
  async getSchoolInformation(@Param() params, @Res() response, @Req() request) {
    const token = request.headers.authorization.split(' ')[1];
    const result = await this.schoolAdminService.getSchoolInformation(
      params.schoolUUID,
      token,
    );
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/detailedInformation/:schoolUUID')
  async getDetailedSchoolInformation(
    @Param() params,
    @Res() response,
    @Req() request,
  ) {
    const token = request.headers.authorization.split(' ')[1];
    const result = await this.schoolAdminService.getDetailedSchoolInformation(
      params.schoolUUID,
      token,
    );
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  // @Roles(Role.Admin)
  @Put('/role')
  async updateRole(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.updateRole(request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }
}
