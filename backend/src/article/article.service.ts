import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { HelperService } from '../helper/helper.service';
import { v4 as uuidv4 } from 'uuid';
import { RETURN_DATA, ID_STARTERS } from 'src/misc/parameterConstants';
import { ReturnMessage } from 'src/types/SchoolAdmin';
import { AddArticleDTO, Article, DeleteArticleDTO, UpdateArticleDTO } from 'src/entity/article/article';
import { Request } from 'express';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { User } from 'src/entity/user/user';

const prisma = new PrismaClient();

@Injectable()
export class ArticleService {
  constructor(private readonly helper: HelperService) { }

  async createArticle(payload: AddArticleDTO, request: Request): Promise<Article> {
    const { articleHeadline, articleCatchPhrase, articleContent, articleType, articleIsPublic } = payload;

    const userUUID = await this.helper.getUserUUIDfromJWT(await this.helper.extractJWTToken(request));

    try {
      const article = await prisma.articles.create({
        data: {
          articleUUID: `${ID_STARTERS.ARTICLE}${uuidv4()}`,
          articleHeadline,
          articleCatchPhrase,
          articleContent,
          articleType,
          articleIsPublic,
          articlePublishTimestamp: articleIsPublic ? new Date() : new Date(946684800),
          users: {
            connect: {
              userUUID,
            },
          },
        },
      });
      return new Article(article);
    } catch (error) {
      throw new InternalServerErrorException("Database error");
    }
  }

  async deleteArticle(payload: DeleteArticleDTO, request: Request): Promise<number> {
    const { articleUUID } = payload;

    try {
      await prisma.articles.delete({
        where: {
          articleUUID,
        },
      });
      return 200;
    } catch (error) {
      throw new InternalServerErrorException("Database error");
    }
  }

  async editArticle(payload: UpdateArticleDTO, request: Request): Promise<Article> {
    const { articleUUID, articleHeadline, articleCatchPhrase, articleContent, articleType, articleIsPublic } = payload;

    try {
      const article = await prisma.articles.update({
        where: {
          articleUUID,
        },
        data: {
          articleHeadline,
          articleCatchPhrase,
          articleContent,
          articleType,
          articleIsPublic,
          articlePublishTimestamp: articleIsPublic ? new Date() : new Date(946684800),
        },
      });
      return new Article(article);
    } catch (error) {
      throw new InternalServerErrorException("Database error");
    }
  }

  /**
   * @deprecated
   * @param request 
   * @returns 
   */
  async publishArticle(request): Promise<ReturnMessage> {
    const { articleUUID } = request;

    try {
      await prisma.articles.update({
        where: {
          articleUUID,
        },
        data: {
          articleIsPublic: true,
          articlePublishTimestamp: new Date(),
        },
      });
    } catch (error) {
      return RETURN_DATA.DATABASE_ERROR;
    }
    return RETURN_DATA.SUCCESS;
  }

  async getArticle(articleUUID: string, request: Request): Promise<Article> {
    try {
      const article = await prisma.articles.findFirst({
        where: {
          articleUUID,
        },
        include: {
          users: true,
        }
      });

      return new Article({
        articleType: {
          articleType: article.articleType,
          articleTypeName: await this.helper.translateArticleType(article.articleType),
        },
        creator: new User(article.users),
        readingTime: await this.helper.computeReadingTime(article.articleContent),
        ...article,
      })
    } catch (error) {
      throw new InternalServerErrorException("Database error");
    }
  }

  async getAllArticles(page, limit, request): Promise<Article[] | Article> {
    try {
      const articles = await prisma.articles.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: {
          users: true,
        }
      });

      const articleData: Article[] = [];

      for (const article of articles) {
        articleData.push(new Article({
          articleType: {
            articleType: article.articleType,
            articleTypeName: await this.helper.translateArticleType(article.articleType),
          },
          creator: new User(article.users),
          readingTime: await this.helper.computeReadingTime(article.articleContent),
          ...article,
        }));
      }
      return articleData;
    } catch {
      throw new InternalServerErrorException("Database error");
    }
  }

  /**
   * @deprecated
   * @param request 
   * @returns 
   */
  async getArticleAvailability(request): Promise<ReturnMessage> {
    const { isPublic } = request;

    try {
      const article = await prisma.articles.findFirst({
        where: {
          articleIsPublic: isPublic,
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
