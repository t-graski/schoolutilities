import { Module } from '@nestjs/common';
import { FileUploadController } from './file.controller';
import { FileUploadService } from './file.service';

@Module({
  imports: [],
  controllers: [FileUploadController],
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class FileUploadModule {}
