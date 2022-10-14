import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CourseController],
  providers: [CourseService, PrismaService],
  exports: [CourseService],
})
export class CourseModule {}
