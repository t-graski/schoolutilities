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
  CacheInterceptor,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddSchoolDTO, School, UpdateSchoolDTO } from 'src/entity/school/school';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { SchoolAdminService } from './schoolAdmin.service';
import { Request } from 'express'
import { AddDepartmentDTO, DeleteDepartmentDTO, Department, UpdateDepartmentDTO } from 'src/entity/department/department';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AddSchoolClassDTO, DeleteSchoolClassDTO, SchoolClass, UpdateSchoolClassDTO } from 'src/entity/school-class/schoolClass';
import { AddJoinCodeDTO, DeleteJoinCodeDTO, JoinCode, JoinSchoolDTO, LeaveSchoolDTO, UpdateJoinCodeDTO } from 'src/entity/join-code/joinCode';
import { User } from 'src/entity/user/user';
import { UpdateRoleDTO, UserRole } from 'src/entity/user-role/userRole';

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

  @ApiOperation({ summary: 'Get all classes of a school' })
  @ApiOkResponse({ type: [SchoolClass] })
  @ApiParam({ name: 'schoolUUID', type: String })
  @UseGuards(JwtAuthGuard)
  @Get('/classes/:schoolUUID')
  // @Roles(Role.Student)
  async getClasses(@Param('schoolUUID') schoolUUID: string, @Req() request: Request): Promise<SchoolClass[] | SchoolClass> {
    return this.schoolAdminService.getClasses(schoolUUID, request);
  }

  @ApiOperation({ summary: 'Add a join code to a school' })
  @ApiCreatedResponse({ type: JoinCode })
  @ApiBody({ type: AddJoinCodeDTO })
  @UseGuards(JwtAuthGuard)
  @Post('/joinCode')
  // @Roles(Role.Admin)
  async addJoinCode(@Body() joinCode: AddJoinCodeDTO, @Req() request: Request): Promise<JoinCode> {
    return this.schoolAdminService.addJoinCode(joinCode, request);
  }

  @ApiOperation({ summary: 'Remove a join code from a school' })
  @ApiOkResponse({ type: Number })
  @ApiBody({ type: DeleteJoinCodeDTO })
  @UseGuards(JwtAuthGuard)
  @Delete('/joinCode')
  // @Roles(Role.Admin)
  async removeJoinCode(@Body() joinCode: DeleteJoinCodeDTO, @Req() request: Request): Promise<number> {
    return this.schoolAdminService.removeJoinCode(joinCode, request);
  }

  @ApiOperation({ summary: 'Update a join code in a school' })
  @ApiOkResponse({ type: JoinCode })
  @ApiBody({ type: UpdateJoinCodeDTO })
  @UseGuards(JwtAuthGuard)
  @Put('/joinCode')
  // @Roles(Role.Admin)
  async updateJoinCode(@Body() joinCode: UpdateJoinCodeDTO, @Req() request: Request): Promise<JoinCode> {
    return this.schoolAdminService.updateJoinCode(joinCode, request);
  }

  @ApiOperation({ summary: 'Get all join codes of a school' })
  @ApiOkResponse({ type: [JoinCode] })
  @ApiParam({ name: 'schoolUUID', type: String })
  @UseGuards(JwtAuthGuard)
  @Get('/joinCode/:schoolUUID')
  // @Roles(Role.Admin)
  async getJoinCodes(@Param('schoolUUID') schoolUUID: string, @Req() request: Request): Promise<JoinCode[] | JoinCode> {
    return this.schoolAdminService.getAllJoinCodes(schoolUUID, request);
  }

  @ApiOperation({ summary: 'Add a user to a school' })
  @ApiCreatedResponse({ type: School })
  @ApiBody({ type: JoinSchoolDTO })
  @UseGuards(JwtAuthGuard)
  @Post('/joinSchool')
  // @Roles(Role.Verified)
  async joinSchool(@Body() joinSchool: JoinSchoolDTO, @Req() request: Request): Promise<School> {
    return this.schoolAdminService.joinSchool(joinSchool, request);
  }

  @ApiOperation({ summary: 'Remove a user from a school' })
  @ApiOkResponse({ type: Number })
  @ApiBody({ type: LeaveSchoolDTO })
  @UseGuards(JwtAuthGuard)
  @Post('/leaveSchool')
  // @Roles(Role.Student)
  async leaveSchool(@Body() leaveSchool: LeaveSchoolDTO, @Req() request: Request): Promise<number> {
    return this.schoolAdminService.leaveSchool(leaveSchool, request);
  }

  @ApiOperation({ summary: 'Get all users of a school' })
  @ApiOkResponse({ type: [User] })
  @ApiParam({ name: 'schoolUUID', type: String })
  @UseGuards(JwtAuthGuard)
  @Get('/users/:schoolUUID')
  // @Roles(Role.Student)
  async getUsersOfSchool(@Param('schoolUUID') schoolUUID: string, @Req() request: Request): Promise<User[]> {
    return this.schoolAdminService.getUsersOfSchool(schoolUUID, request);
  }

  @ApiOperation({ summary: 'Get permissions of a user' })
  @ApiOkResponse({ type: [UserRole] })
  @ApiParam({ name: 'userUUID', type: String })
  @UseGuards(JwtAuthGuard)
  @Get('/permissions/:userUUID')
  async getUserPermissions(@Param('userUUID') userUUID: string, @Req() request: Request): Promise<UserRole[] | UserRole> {
    return this.schoolAdminService.getUserPermissions(userUUID);
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

  /**
   * @deprecated
   * @param params 
   * @param response 
   * @param request 
   * @returns 
   */
  @ApiOperation({ deprecated: true })
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

  @ApiOperation({ summary: 'Update role of user' })
  @ApiOkResponse({ type: UserRole })
  @ApiBody({ type: UpdateRoleDTO })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Put('/role')
  async updateRole(@Body() role: UpdateRoleDTO, @Req() request, @Res() response): Promise<UserRole> {
    return this.schoolAdminService.updateRole(role, request);
  }
}
