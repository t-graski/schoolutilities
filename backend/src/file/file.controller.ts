import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  Req,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { diskStorage } from 'multer';
import { FileUploadService } from './file.service';
import { editFileName, imageFileFilter } from 'src/misc/fileUpload';
import { LENGTHS } from 'src/misc/parameterConstants';

@Controller('api/courseFile')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  // @UseGuards(JwtAuthGuard)
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

  // @UseGuards(JwtAuthGuard)
  @Get('/getFileUUID')
  async getFileUUID(@Req() request, @Res() response) {
    const result = await this.fileUploadService.getFileUUID(request.body);
    return response.status(result.status).json(result?.data);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/getFileInfo')
  async getFileInfo(@Req() request, @Res() response) {
    const result = await this.fileUploadService.getFileInfo(request.body);
    return response.status(result.status).json(result?.data);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/getFile')
  async getFile(@Req() request, @Res() response) {
    const result = await this.fileUploadService.getFile(request.body);
    if (result?.message) {
      return response.status(result.status).json(result?.message);
    }
    return response
      .status(result.status)
      .sendFile(result?.data, { root: process.env.FILE_PATH });
  }
}
