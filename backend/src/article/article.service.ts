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
  constructor(private readonly helper: HelperService) { }

  async createArticle(request): Promise<ReturnMessage> {
    const { headline, catchPhrase = '', content, type, isPublic } = request.body;

    const userUUID = await this.helper.getUserUUIDfromJWT(
      await this.helper.extractJWTToken(request),
    );
    const userId = await this.helper.getUserIdByUUID(userUUID);

    try {
      const article = await prisma.articles.create({
        data: {
          articleUUID: `${ID_STARTERS.ARTICLE}${uuidv4()}`,
          headline,
          catchPhrase,
          content,
          type,
          isPublic,
          publishDate: isPublic ? new Date() : new Date(946684800),
          personCreationId: userId,
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

  async deleteArticle(request): Promise<ReturnMessage> {
    const { articleUUID } = request.body;
    const articleId = await this.helper.getArticleIdByUUID(articleUUID);

    try {
      await prisma.articles.delete({
        where: {
          articleId,
        },
      });
    } catch (error) {
      return RETURN_DATA.DATABASE_ERROR;
    }
    return RETURN_DATA.SUCCESS;
  }

  async editArticle(request): Promise<ReturnMessage> {
    const { articleUUID, headline, catchPhrase, content, type, isPublic } =
      request.body;

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
          publishDate: isPublic ? new Date() : new Date(946684800),
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
          publishDate: new Date(),
        },
      });
    } catch (error) {
      return RETURN_DATA.DATABASE_ERROR;
    }
    return RETURN_DATA.SUCCESS;
  }

  async getArticle(request, articleUUID): Promise<ReturnMessage> {

    try {
      const article = await prisma.articles.findFirst({
        where: {
          articleUUID,
        },
      });

      const creator = await this.helper.getUserById(article.personCreationId);

      const articleItem = {
        articleUUID: article.articleUUID,
        headline: article.headline,
        catchPhrase: article.catchPhrase,
        content: article.content,
        type: {
          articleTypeId: article.type,
          articleTypeName: await this.helper.translateArticleType(article.type),
        },
        isPublic: article.isPublic,
        publishDate: article.publishDate,
        creationDate: article.creationDate,
        creator: {
          firstName: creator.firstName,
          lastName: creator.lastName,
        },
        readingTime: await this.helper.computeReadingTime(article.content),
      }

      return {
        status: RETURN_DATA.SUCCESS.status,
        data: articleItem,
      };
    } catch (error) {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  async getAllArticles(request): Promise<ReturnMessage> {
    const articles = await prisma.articles.findMany({
      where: {
        creationDate: {
          gt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
        },
      },
    });

    articles.sort((a, b) => {
      return b.creationDate.getTime() - a.creationDate.getTime();
    });

    return {
      status: RETURN_DATA.SUCCESS.status,
      data: articles,
    };
  }

  async getArticleAvailability(request): Promise<ReturnMessage> {
    const { isPublic } = request;

    try {
      const article = await prisma.articles.findFirst({
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
