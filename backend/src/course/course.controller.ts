import {
  Controller,
  Req,
  Res,
  Post,
  UseGuards,
  Delete,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CourseService } from './course.service';

@Controller('api/course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/addCourse')
  async addCourse(@Req() request, @Res() response) {
    const result = await this.courseService.addCourse(request.body);
    return response.status(result.status).json(result?.data);
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
    return response.status(result.status).json(result?.message);
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
}
