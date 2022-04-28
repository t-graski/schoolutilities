import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AssetsService } from './assets.service';
import { of } from 'rxjs';
import * as fs from 'fs';
import { RolesGuard } from 'src/roles/roles.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';

@UseGuards(RolesGuard)
@Controller('/api/assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get('/logos/:logoname')
  async getLogo(@Param('logoname') logoname, @Res() response) {
    return of(
      response
        .status(HttpStatus.OK)
        .sendFile(`${logoname}`, { root: process.env.LOGO_PATH }),
    );
  }

  @Get('/images/:filename')
  async getImage(@Param('filename') filename, @Res() response) {
    return of(
      response
        .status(HttpStatus.OK)
        .sendFile(`${filename}`, { root: process.env.FILE_PATH }),
    );
  }

  @Get('/submissions/:fileUUID')
  async getSubmission(@Param('fileUUID') fileUUID, @Res() response) {
    return of(
      response
        .status(HttpStatus.OK)
        .sendFile(`${fileUUID}`, { root: process.env.FILE_PATH }),
    );
  }

  // @Roles(Role.Supervisor)
  @Get('/list/logo')
  async listLogos(@Res() response) {
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
