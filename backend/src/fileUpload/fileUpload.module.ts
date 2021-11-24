import { Module } from '@nestjs/common';
import { FileUploadController } from './fileUpload.controller';
import { FileUploadService } from './fileUpload.service';

@Module({
  imports: [],
  controllers: [FileUploadController],
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class FileUploadModule {}
