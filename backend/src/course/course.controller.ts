import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  Req,
  Get,
  UseGuards,
  Delete,
  Put,
  Param,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { diskStorage } from 'multer';
import { editFileName, fileFilter } from 'src/misc/fileUpload';
import { CourseService } from './course.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { of } from 'rxjs';
import { Request, Response } from 'express';
import { AddCourseDTO, AddCourseUserDTO, Course, DeleteCourseDTO, RemoveCourseUserDTO, UpdateCourseDTO } from 'src/entity/course/course';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { CourseUser } from 'src/entity/course-user/courseUser';

// @UseInterceptors(ClassSerializerInterceptor)
@Controller('api/course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Teacher)
  @Post('')
  async addCourse(@Body() course: AddCourseDTO, @Req() request): Promise<Course> {
    return this.courseService.addCourse(course, request);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Teacher)
  @Delete('')
  async removeCourse(@Body() course: DeleteCourseDTO): Promise<Course> {
    return this.courseService.removeCourse(course);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Teacher)
  @Put('')
  async updateCourse(@Body() course: UpdateCourseDTO, @Req() request): Promise<Course> {
    return this.courseService.updateCourse(course);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/user')
  async addUser(@Body() course: AddCourseUserDTO, @Req() request): Promise<CourseUser> {
    return this.courseService.addUser(course, request);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/user')
  async removeUser(@Body() course: RemoveCourseUserDTO, @Req() request): Promise<number> {
    return this.courseService.removeUser(course);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Student)
  @Get('/courses/:schoolUUID')
  async getCourses(@Param('schoolUUID') schoolUUID: string, @Req() request: Request): Promise<Course[]> {
    return this.courseService.getAllCourses(schoolUUID, request);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/submissions/:elementUUID')
  @Roles(Role.Teacher)
  async getSubmissions(@Param() params, @Req() request, @Res() response) {
    const result = await this.courseService.getSubmissions(
      request,
      params.elementUUID,
    );
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/info/:courseUUID')
  @Roles(Role.Student)
  async getCourseInfo(@Param('courseUUID') course: string, @Req() request: Request) {
    return this.courseService.getCourseInfo(course, request);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/courseElements')
  @Roles(Role.Teacher)
  async courseElements(@Req() request, @Res() response) {
    const result = await this.courseService.courseElements(request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/courseElements/:courseUUID')
  async getCourseElements(@Param() params, @Req() request, @Res() response) {
    const result = await this.courseService.getCourseElements(
      params.courseUUID,
    );
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Student)
  @Post('/submitExercise')
  @UseInterceptors(
    FileInterceptor('files', {
      storage: diskStorage({
        destination: process.env.FILE_PATH,
        filename: editFileName,
      }),
      fileFilter: fileFilter,
      limits: { fileSize: 10000000 },
    }),
  )
  async submitExercise(@Req() request, @Res() response, @UploadedFile() file) {
    if (file) {
      const result = await this.courseService.submitExercise(request, file);
      return response
        .status(result.status)
        .json(result?.data ? result.data : result.message);
    }

    return response.status(400).json({ message: 'Invalid file' });
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Student)
  @Get('/element/:elementUUID')
  async getElement(@Param() params, @Req() request, @Res() response) {
    const result = await this.courseService.getElement(
      request,
      params.elementUUID,
    );
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.Student)
  // @Get('/events/:schoolUUID/:days')
  // async getEvents(
  //   @Param('schoolUUID') schoolUUID: string, @Param('days') days: string, @Req() request: Request) {
  //   return this.courseService.getEvents(schoolUUID, days, request);
  // }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Teacher)
  @Get('downloadAll/:elementUUID')
  async downloadAll(@Param() params, @Req() request, @Res() response: Response) {
    const result = await this.courseService.downloadAll(params, request);

    return of(
      response
        .set('Content-Type', 'application/octet-stream')
        .set('Content-Disposition', `attachment; filename="abc.zip"`)
        .status(HttpStatus.OK)
        .sendFile(`${result.data}`, { root: process.env.FILE_PATH }),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('revertExercise/:elementUUID')
  @Roles(Role.Student)
  async revertExercise(@Param() params, @Req() request, @Res() response) {
    const result = await this.courseService.revertExercise(
      request,
      params.elementUUID,
    );
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }
}
