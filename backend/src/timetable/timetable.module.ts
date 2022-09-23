import { Module } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';

@Module({
  controllers: [TimetableController],
  providers: [TimetableService]
})
export class TimetableModule {}
