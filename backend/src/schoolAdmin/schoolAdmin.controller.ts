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
  UseInterceptors,
  ClassSerializerInterceptor,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddSchoolDTO, School, UpdateSchoolDTO } from 'src/entity/school/school';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { SchoolAdminService } from './schoolAdmin.service';
import { Request } from 'express'
import { AddDepartmentDTO, DeleteDepartmentDTO, Department, UpdateDepartmentDTO } from 'src/entity/department/department';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AddSchoolClassDTO, DeleteSchoolClassDTO, SchoolClass, UpdateSchoolClassDTO } from 'src/entity/school-class/schoolClass';

@ApiBearerAuth()
@ApiTags('SchoolAdmin')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('/api/schoolAdmin')
@UseGuards(RolesGuard)
export class SchoolAdminController {
  constructor(private readonly schoolAdminService: SchoolAdminService) { }

  @ApiOperation({ summary: 'Create a new school' })
  @ApiCreatedResponse({ type: School })
  @ApiBody({ type: AddSchoolDTO })
  @UseGuards(JwtAuthGuard)
  // @Roles(Role.Student)
  @Post('/school')
  async addSchoolConfig(@Body() school: AddSchoolDTO, @Req() request: Request): Promise<School> {
    return this.schoolAdminService.addSchoolConfig(school, request);
  }

  @ApiOperation({ summary: 'Add a department to a school' })
  @ApiCreatedResponse({ type: Department })
  @ApiBody({ type: AddDepartmentDTO })
  @UseGuards(JwtAuthGuard)
  @Post('/department')
  // @Roles(Role.Admin)
  async addDepartment(@Body() department: AddDepartmentDTO, @Req() request): Promise<Department> {
    return this.schoolAdminService.addDepartment(department, request);
  }

  @ApiOperation({ summary: 'Add multiple departments to a school' })
  @ApiCreatedResponse({ type: [Department] })
  @ApiBody({ type: [AddSchoolDTO] })
  @UseGuards(JwtAuthGuard)
  @Post('/departments')
  // @Roles(Role.Admin)
  async addDepartments(@Body() departments: AddDepartmentDTO[], @Req() request): Promise<Department[]> {
    return this.schoolAdminService.addDepartments(departments, request);
  }

  @ApiOperation({ summary: 'Remove department from school' })
  @ApiOkResponse({ type: Number })
  @ApiBody({ type: DeleteDepartmentDTO })
  @UseGuards(JwtAuthGuard)
  @Delete('/department')
  // @Roles(Role.Admin)
  async removeDepartment(@Body() department: DeleteDepartmentDTO, @Req() request): Promise<number> {
    return this.schoolAdminService.removeDepartment(department);

  }

  @ApiOperation({ summary: 'Update department in school' })
  @ApiOkResponse({ type: Department })
  @ApiBody({ type: UpdateDepartmentDTO })
  @UseGuards(JwtAuthGuard)
  @Put('/department')
  // @Roles(Role.Admin)
  async updateDepartment(@Body() department: UpdateDepartmentDTO): Promise<Department> {
    return this.schoolAdminService.updateDepartment(department);
  }

  @ApiOperation({ summary: 'Get all departments in a school' })
  @ApiOkResponse({ type: [Department] })
  @UseGuards(JwtAuthGuard)
  @Get('/departments/:schoolUUID')
  // @Roles(Role.Student)
  async getDepartments(@Param('schoolUUID') schoolUUID: string): Promise<Department[]> {
    return this.schoolAdminService.getDepartments(schoolUUID);

  }

  @ApiOperation({ summary: 'Add a class to a department' })
  @ApiCreatedResponse({ type: SchoolClass })
  @ApiBody({ type: AddSchoolClassDTO })
  @UseGuards(JwtAuthGuard)
  @Post('/class')
  // @Roles(Role.Admin)
  async addClass(@Body() schoolClass: AddSchoolClassDTO, @Req() request): Promise<SchoolClass> {
    return this.schoolAdminService.addClass(schoolClass);
  }

  @ApiOperation({ summary: 'Remove a class from a department' })
  @ApiOkResponse({ type: Number })
  @ApiBody({ type: DeleteSchoolClassDTO })
  @UseGuards(JwtAuthGuard)
  @Delete('/class')
  // @Roles(Role.Admin)
  async removeClass(@Body() schoolClass: DeleteSchoolClassDTO, @Req() request): Promise<number> {
    return this.schoolAdminService.removeClass(schoolClass);

  }

  @ApiOperation({ summary: 'Update a class in a department' })
  @ApiOkResponse({ type: SchoolClass })
  @ApiBody({ type: UpdateSchoolDTO })
  @UseGuards(JwtAuthGuard)
  @Put('/class')
  // @Roles(Role.Admin)
  async updateClass(@Body() schoolClass: UpdateSchoolClassDTO, @Req() request: Request): Promise<SchoolClass> {
    return this.schoolAdminService.updateClass(schoolClass);
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
  @Get('/userPermissions')
  async getUserPermissions(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.getUserPermissions(
      request.body,
    );
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

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
  @Roles(Role.Admin)
  @Put('/role')
  async updateRole(@Req() request, @Res() response) {
    const result = await this.schoolAdminService.updateRole(request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }
}
