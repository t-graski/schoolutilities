import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

@Injectable()
export class AssetsService {
  constructor() {
  }

  async getFileName(fileUUID: string): Promise<any> {
    try {
      const file = await prisma.fileSubmissions.findFirst({
        where: {
          fileName: fileUUID,
        }
      })
      return file.originalName;
    } catch {
      return null;
    }
  }
}
