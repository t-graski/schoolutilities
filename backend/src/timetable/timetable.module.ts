import { Module } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';
import { RolesGuard } from 'src/roles/roles.guard';

@Module({
  imports: [RolesGuard],
  controllers: [TimetableController],
  providers: [TimetableService],
  exports: [TimetableService],
})
/*
imports: [DatabaseModule, RolesGuard],
  controllers: [SchoolAdminController],
  providers: [SchoolAdminService],
  exports: [SchoolAdminService],
*/
export class TimetableModule {}
