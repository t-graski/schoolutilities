import { Module } from '@nestjs/common';
import { UntisImportService } from './untis-import.service';
import { UntisImportController } from './untis-import.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [UntisImportController],
  providers: [UntisImportService]
})
export class UntisImportModule { }
