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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/misc/fileUpload';
import { CourseService } from './course.service';
import { HelperService } from 'src/helper/helper.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';


@Controller('api/course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly helper: HelperService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Teacher)
  @Post('/addCourse')
  async addCourse(@Req() request, @Res() response) {
    const result = await this.courseService.addCourse(request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Teacher)
  @Delete('/removeCourse')
  async removeCourse(@Req() request, @Res() response) {
    const result = await this.courseService.removeCourse(
      request.body?.courseId,
    );
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
    const result = await this.courseService.addUser(request.body);
    return response.status(result.status).json(result?.message);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/removeUser')
  async removeUser(@Req() request, @Res() response) {
    const result = await this.courseService.removeUser(request.body);
    return response.status(result.status).json(result?.message);
  }

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

  @Put('/courseElements')
  async courseElements(@Req() request, @Res() response) {
    const result = await this.courseService.courseElements(request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @Get('/courseElements/:courseUUID')
  async getCourseElements(@Param() params, @Req() request, @Res() response) {
    const result = await this.courseService.getCourseElements(
      params.courseUUID,
    );
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @Post('/submitExercise')
  @UseInterceptors(
    FileInterceptor('files', {
      storage: diskStorage({
        destination: '../files/',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: { fileSize: 100 },
    }),
  )
  async submitExercise(@Req() request, @Res() response) {

  }

  @Get('/element/:elementUUID')
  async getElement(@Param() params, @Req() request, @Res() response) {
    const result = await this.courseService.getElement(request, params.elementUUID);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

}
