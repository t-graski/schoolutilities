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
import { HelperService } from 'src/helper/helper.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { RemoveCourseDto } from 'src/dto/removeCourse';
import { GetEventsDto } from 'src/dto/events';
import { of } from 'rxjs';
import { Response } from 'express';
import { AddCourseDTO, AddCourseUserDTO, Course, DeleteCourseDTO, UpdateCourseDTO } from 'src/entity/course/course';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { CourseUser } from 'src/entity/course-user/courseUser';

@UseInterceptors(ClassSerializerInterceptor)
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
  async removeUser(@Req() request, @Res() response) {
    return this.courseService.removeUser(request);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getCourses/:schoolUUID')
  @Roles(Role.Student)
  async getCourses(@Param() params, @Req() request, @Res() response) {
    const token = request.headers.authorization.split(' ')[1];
    const result = await this.courseService.getAllCourses(
      params.schoolUUID,
      token,
    );
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getCourseInfo/:courseUUID')
  @Roles(Role.Student)
  async getCourseInfo(@Param() params, @Req() request, @Res() response) {
    const token = request.headers.authorization.split(' ')[1];
    const result = await this.courseService.getCourseInfo(
      params.courseUUID,
      token,
    );
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
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
  @Get('submissions/:elementUUID')
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

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Student)
  @Get('/events/:schoolUUID/:days')
  async getEvents(
    @Param() params: GetEventsDto,
    @Req() request,
    @Res() response,
  ) {
    const result = await this.courseService.getEvents(params, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

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
