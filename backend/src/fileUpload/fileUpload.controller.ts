import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUploadService } from './fileUpload.service';
import { editFileName, imageFileFilter } from 'src/misc/fileUpload';
import { LENGTHS } from 'src/misc/parameterConstants';

@Controller('api/uploadFile')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: '../files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: { fileSize: LENGTHS.MAX_FILE_SIZE },
    }),
  )
  async uploadFile(@Req() request, @Res() response, @UploadedFile() file) {
    const result = await this.fileUploadService.uploadFile(file, request);
    return response.status(result.status).json(result?.message);
  }
}
