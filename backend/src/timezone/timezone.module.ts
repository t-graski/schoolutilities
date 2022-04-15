import { Module } from '@nestjs/common';
import { TimezoneService } from './timezone.service';
import { TimezoneController } from './timezone.controller';

@Module({
  providers: [TimezoneService],
  controllers: [TimezoneController],
})
export class TimezoneModule {}
