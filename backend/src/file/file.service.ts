import { Injectable, HttpStatus, StreamableFile } from '@nestjs/common';
import { RETURN_DATA } from '../misc/parameterConstants';
import { PrismaClient } from '@prisma/client';
import validator from 'validator';
import * as fs from 'fs';
import { ReturnMessage } from 'src/types/Database';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const prisma = new PrismaClient();

@Injectable()
export class FileUploadService {
  constructor() { }

  async uploadFile(file, request) {
    if (request.fileValidationError?.status === HttpStatus.BAD_REQUEST) {
      return RETURN_DATA.INVALID_FILE;
    }

    if (!file) {
      return RETURN_DATA.NO_FILE_PROVIDED;
    }

    try {
      await prisma.courseFiles.create({
        data: {
          courseFileUUID: file.filename,
          courseFileName: request.file.originalname.split('.')[0],
          courseFileSize: Number(file.size),
          courseFileType: file.mimetype,
        },
      });
    } catch (error) {
      return RETURN_DATA.DATABASE_ERROR;
    }
    return RETURN_DATA.SUCCESS;
  }

  async getFileUUID(body: any): Promise<ReturnMessage> {
    const { fileId } = body;

    if (!validator.isNumeric(fileId)) {
      RETURN_DATA.INVALID_INPUT;
    }

    try {
      const file = await prisma.courseFiles.findUnique({
        where: {
          courseFileId: Number(fileId),
        },
        select: {
          courseFileUUID: true,
        },
      });

      if (!file) {
        return RETURN_DATA.NOT_FOUND;
      }

      return {
        status: HttpStatus.OK,
        data: file,
      };
    } catch (error) {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  async getFileInfo(body: any): Promise<ReturnMessage> {
    const { fileId } = body;

    if (!validator.isNumeric(fileId)) {
      RETURN_DATA.INVALID_INPUT;
    }

    try {
      const file = await prisma.courseFiles.findUnique({
        where: {
          courseFileId: Number(fileId),
        },
        select: {
          courseFileUUID: true,
          courseFileUploadTimestamp: true,
          courseFileName: true,
          courseFileSize: true,
          courseFileType: true,
        },
      });

      if (!file) {
        return RETURN_DATA.NOT_FOUND;
      }

      return {
        status: HttpStatus.OK,
        data: file,
      };
    } catch (error) {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  async getFile(body: any): Promise<ReturnMessage> {
    const { fileId } = body;

    if (!validator.isNumeric(fileId)) {
      RETURN_DATA.INVALID_INPUT;
    }

    try {
      const fileUUID = await prisma.courseFiles.findUnique({
        where: {
          courseFileId: Number(fileId),
        },
        select: {
          courseFileUUID: true,
        },
      });

      if (!fileUUID) {
        return RETURN_DATA.NOT_FOUND;
      }

      if (
        !fs.existsSync(`${process.env.FILE_PATH}${fileUUID.courseFileUUID}`)
      ) {
        return RETURN_DATA.NOT_FOUND;
      }

      return {
        status: HttpStatus.OK,
        data: `${fileUUID.courseFileUUID}`,
      };
    } catch (error) {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }
}
