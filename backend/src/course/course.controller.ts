import {
  Controller,
  Req,
  Res,
  Post,
  UseGuards,
  Delete,
  Put,
  Get,
  Param,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HelperService } from 'src/helper/helper.service';
import { CourseService } from './course.service';

@Controller('api/course')
export class CourseController {
  constructor(private readonly courseService: CourseService, private readonly helper: HelperService) { }

  // @UseGuards(JwtAuthGuard)
  @Post('/addCourse')
  async addCourse(@Req() request, @Res() response) {
    const result = await this.courseService.addCourse(request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/removeCourse')
  async removeCourse(@Req() request, @Res() response) {
    const result = await this.courseService.removeCourse(
      request.body?.courseId,
    );
    return response.status(result.status).json(result?.message);
  }

  @UseGuards(JwtAuthGuard)
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
}
