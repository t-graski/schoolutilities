import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { HelperService } from '../helper/helper.service';
import { v4 as uuidv4 } from 'uuid';
import { RETURN_DATA, ID_STARTERS } from 'src/misc/parameterConstants';
import validator from 'validator';
import { ReturnMessage } from 'src/types/SchoolAdmin';

const prisma = new PrismaClient();

@Injectable()
export class ArticleService {
  constructor(private readonly helper: HelperService) {}

  async createArticle(request): Promise<ReturnMessage> {
    const { headline, catchPhrase = '', content, type, isPublic } = request;

    const userUUID = await this.helper.getUserUUIDfromJWT(
      await this.helper.extractJWTToken(request),
    );
    const userId = await this.helper.getUserIdByUUID(userUUID);

    try {
      await prisma.articles.create({
        data: {
          articleUUID: `${ID_STARTERS.ARTICLE}${uuidv4()}`,
          headline,
          catchPhrase,
          content,
          type,
          isPublic,
          publishDate: isPublic ? Date.now() : null,
          creator: userId,
        },
      });
    } catch (error) {
      return RETURN_DATA.DATABASE_ERROR;
    }
    return RETURN_DATA.SUCCESS;
  }

  async deleteArticle(request): Promise<ReturnMessage> {
    const { articleUUID } = request;

    try {
      await prisma.articles.delete({
        where: {
          articleUUID,
        },
      });
    } catch (error) {
      return RETURN_DATA.DATABASE_ERROR;
    }
    return RETURN_DATA.SUCCESS;
  }

  async editArticle(request): Promise<ReturnMessage> {
    const { articleUUID, headline, catchPhrase, content, type, isPublic } =
      request;

    try {
      await prisma.articles.update({
        where: {
          articleUUID,
        },
        data: {
          headline,
          catchPhrase,
          content,
          type,
          isPublic,
          publishDate: isPublic ? Date.now() : null,
        },
      });
    } catch (error) {
      return RETURN_DATA.DATABASE_ERROR;
    }
    return RETURN_DATA.SUCCESS;
  }

  async publishArticle(request): Promise<ReturnMessage> {
    const { articleUUID } = request;

    try {
      await prisma.articles.update({
        where: {
          articleUUID,
        },
        data: {
          isPublic: true,
          publishDate: Date.now(),
        },
      });
    } catch (error) {
      return RETURN_DATA.DATABASE_ERROR;
    }
    return RETURN_DATA.SUCCESS;
  }

  async getArticle(request): Promise<ReturnMessage> {
    const { articleUUID } = request;

    try {
      const article = await prisma.articles.findOne({
        where: {
          articleUUID,
        },
      });
      return {
        status: RETURN_DATA.SUCCESS.status,
        data: article,
      };
    } catch (error) {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  async getAllArticles(request): Promise<ReturnMessage> {
    await prisma.articles.findMany({
      where: {
        creationDate: {
          gt: Date.now() - 1000 * 60 * 60 * 24 * 30,
        },
        orderBy: {
          creationDate: 'desc',
        },
      },
    });
    return RETURN_DATA.SUCCESS;
  }

  async getArticleAvailability(request): Promise<ReturnMessage> {
    const { isPublic } = request;

    try {
      const article = await prisma.articles.findOne({
        where: {
          isPublic,
        },
      });
      return {
        status: RETURN_DATA.SUCCESS.status,
        data: article,
      };
    } catch (error) {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }
}
