import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class SchoolAdminModule {}
