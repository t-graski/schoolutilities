import { Injectable, HttpStatus } from '@nestjs/common';
import { RETURN_DATA } from '../misc/parameterConstants';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('mysql2');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class FileUploadService {
  connection: any;
  constructor() {}

  async uploadFile(file, request) {
    if (request.fileValidationError?.status === HttpStatus.BAD_REQUEST) {
      return RETURN_DATA.INVALID_FILE;
    }

    if (!file) {
      return RETURN_DATA.NO_FILE_PROVIDED;
    }

    return RETURN_DATA.SUCCESS;
  }
}
