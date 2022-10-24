import { Module } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [NotificationModule],
  controllers: [TimetableController],
  providers: [TimetableService],
  exports: [TimetableService],
})

export class TimetableModule { }
