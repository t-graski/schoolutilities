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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { diskStorage } from 'multer';
import { editFileName, fileFilter } from 'src/misc/fileUpload';
import { CourseService } from './course.service';
import { HelperService } from 'src/helper/helper.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { AddCourseDto } from 'src/dto/addCourse';
import { RemoveCourseDto } from 'src/dto/removeCourse';
import { GetEventsDto } from 'src/dto/events';

@Controller('api/course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly helper: HelperService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Teacher)
  @Post('/addCourse')
  async addCourse(
    @Body() addCourse: AddCourseDto,
    @Req() request,
    @Res() response,
  ) {
    const result = await this.courseService.addCourse(addCourse, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Teacher)
  @Delete('/removeCourse')
  async removeCourse(
    @Body() removeCourse: RemoveCourseDto,
    @Req() request,
    @Res() response,
  ) {
    const result = await this.courseService.removeCourse(removeCourse, request);
    return response.status(result.status).json(result?.message);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Teacher)
  @Put('/updateCourse')
  async updateCourse(@Req() request, @Res() response) {
    const result = await this.courseService.updateCourse(request.body);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/addUser')
  async addUser(@Req() request, @Res() response) {
    const result = await this.courseService.addUser(request);
    return response.status(result.status).json(result?.message);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/removeUser')
  async removeUser(@Req() request, @Res() response) {
    const result = await this.courseService.removeUser(request);
    return response.status(result.status).json(result?.message);
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
}
