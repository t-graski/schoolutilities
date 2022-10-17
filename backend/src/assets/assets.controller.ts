import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Param,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AssetsService } from './assets.service';
import { Observable, of } from 'rxjs';
import * as fs from 'fs';
import { RolesGuard } from 'src/roles/roles.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { Response } from 'express';
import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(RolesGuard)
@Controller('/api/assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) { }

  @ApiOperation({ summary: 'Get a logo varient by it\'s name' })
  @ApiParam({ name: 'logoname', type: String })
  @Get('/logos/:logoname')
  async getLogo(@Param('logoname') logoname: string, @Res() response: Response): Promise<Observable<void>> {
    return of(
      response
        .status(HttpStatus.OK)
        .sendFile(`${logoname}`, { root: process.env.LOGO_PATH }),
    );
  }

  @ApiOperation({ summary: 'Get an image by it\'s name' })
  @ApiParam({ name: 'filename', type: String })
  @Get('/images/:filename')
  async getImage(@Param('filename') filename: string, @Res() response: Response): Promise<Observable<void>> {
    return of(
      response
        .status(HttpStatus.OK)
        .sendFile(`${filename}`, { root: process.env.FILE_PATH }),
    );
  }

  @ApiOperation({ summary: 'Get a file submission by it\'s UUID' })
  @ApiParam({ name: 'fileUUID', type: String })
  @Get('/submissions/:fileUUID')
  async getSubmission(@Param('fileUUID') fileUUID: string, @Res() response: Response): Promise<void> {
    const fileName = await this.assetsService.getFileName(fileUUID);
    return response
      .set('Content-Type', 'application/octet-stream')
      .set('Content-Disposition', `attachment; filename="${fileName}"`)
      .status(HttpStatus.OK)
      .sendFile(`${fileUUID}`, { root: process.env.FILE_PATH });
  }

  @ApiOperation({ summary: 'Get a list of all logos' })
  @Get('/list/logo')
  async listLogos(@Res() response: Response): Promise<Response<any, Record<string, any>>> {
    const dir = process.env.LOGO_PATH;
    const files = fs.readdirSync(dir);

    const logos = [];

    for (const file of files) {
      logos.push({
        name: file,
        size: fs.statSync(dir + file).size,
        dateModified: fs.statSync(dir + file).mtime,
      });
    }
    return response.status(HttpStatus.OK).json(logos);
  }

  @Roles(Role.Supervisor)
  @UseGuards(RolesGuard)
  @Get('/list/images')
  async listImages(@Res() response) {
    const dir = process.env.FILE_PATH;
    const files = fs.readdirSync(dir);

    const images = [];

    for (const file of files) {
      images.push({
        name: file,
        size: fs.statSync(dir + file).size,
        dateModified: fs.statSync(dir + file).mtime,
      });
    }

    return response.status(HttpStatus.OK).json(images);
  }
}
