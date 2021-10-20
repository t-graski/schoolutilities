import {
  Controller,
  Req,
  Res,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CourseService } from './course.service';

@Controller('api/course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/addCourse')
  async addSchoolConfig(@Req() request, @Res() response) {
    const result = await this.courseService.addCourse(request.body);
    return response.status(result.status).json(result?.data);
  }
}
