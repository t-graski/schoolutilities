import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class AssetsService {
  constructor() {
  }

  async getFileName(fileUUID: string): Promise<string> {
    try {
      const file = await prisma.courseFileSubmissions.findFirst({
        where: {
          courseFileSubmissionFileName: fileUUID,
        }
      })
      return file.courseFileSubmissionOriginalName;
    } catch {
      return null;
    }
  }
}
