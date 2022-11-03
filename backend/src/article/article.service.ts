import { AddArticleDTO, Article, DeleteArticleDTO, UpdateArticleDTO } from 'src/entity/article/article';
import { Request } from 'express';
import { User } from 'src/entity/user/user';
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { HelperService } from "../helper/helper.service";
import { v4 as uuidv4 } from "uuid";
import { RETURN_DATA, ID_STARTERS } from "src/misc/parameterConstants";
import { ReturnMessage } from 'src/types/Database';

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

  async deleteArticle(payload: DeleteArticleDTO, request: Request): Promise<Article> {
    const { articleUUID } = payload;

    try {
      const article = await prisma.articles.delete({
        where: {
          articleUUID,
        },
      });
      return new Article(article);
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

  async uploadFile(file, request): Promise<ReturnMessage> {
    const { articleUUID } = request.body;
    try {
      const articleFile = await prisma.articleFile.create({
        data: {
          articleFileUUID: `${file.filename}`,
          articleFileName: `${file.originalname}`,
          articleFileSize: file.size,
          articles: {
            connect: {
              articleUUID,
            },
          },
        },
      });
      return {
        status: RETURN_DATA.SUCCESS.status,
        data: articleFile,
      };
    } catch {
      throw new InternalServerErrorException("Database error");
    }
  }

  async getArticleFiles(articleUUID: string): Promise<ReturnMessage> {
    try {
      const articleFiles = await prisma.articleFile.findMany({
        where: {
          articles: {
            articleUUID,
          },
        },
      });

      return {
        status: RETURN_DATA.SUCCESS.status,
        data: articleFiles,
      };
    } catch {
      throw new InternalServerErrorException("Database error");
    }
  }
}
