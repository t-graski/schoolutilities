import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { HelperService } from "../helper/helper.service";
import { v4 as uuidv4 } from "uuid";
import { RETURN_DATA, ID_STARTERS } from "src/misc/parameterConstants";
import validator from "validator";
import { ReturnMessage } from "src/types/SchoolAdmin";

const prisma = new PrismaClient();

@Injectable()
export class ArticleService {
  constructor(private readonly helper: HelperService) {}

  async createArticle(request): Promise<ReturnMessage> {
    const { headline, catchPhrase = "", content, type, isPublic } = request.body;

    const userUUID = await this.helper.getUserUUIDfromJWT(await this.helper.extractJWTToken(request));
    const userId = await this.helper.getUserIdByUUID(userUUID);

    try {
      const article = await prisma.articles.create({
        data: {
          articleUUID: `${ID_STARTERS.ARTICLE}${uuidv4()}`,
          articleHeadline: headline,
          articleCatchPhrase: catchPhrase,
          articleContent: content,
          articleType: type,
          articleIsPublic: isPublic,
          articlePublishTimestamp: isPublic ? new Date() : new Date(946684800),
          users: {
            connect: {
              userId,
            },
          },
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
    const { articleUUID, headline, catchPhrase, content, type, isPublic } = request.body;

    try {
      await prisma.articles.update({
        where: {
          articleUUID,
        },
        data: {
          articleHeadline: headline,
          articleCatchPhrase: catchPhrase,
          articleContent: content,
          articleType: type,
          articleIsPublic: isPublic,
          articlePublishTimestamp: isPublic ? new Date() : new Date(946684800),
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
          articleIsPublic: true,
          articlePublishTimestamp: new Date(),
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

      const creator = await this.helper.getUserById(article.articleCreatorId);

      const articleItem = {
        articleUUID: article.articleUUID,
        articleHeadline: article.articleHeadline,
        articleCatchPhrase: article.articleCatchPhrase,
        articleContent: article.articleContent,
        type: {
          articleTypeId: article.articleType,
          articleTypeName: await this.helper.translateArticleType(article.articleType),
        },
        articleIsPublic: article.articleIsPublic,
        articlePublishTimestamp: article.articlePublishTimestamp,
        articleCreationTimestamp: article.articleCreationTimestamp,
        creator: {
          firstName: creator.firstName,
          lastName: creator.lastName,
        },
        readingTime: await this.helper.computeReadingTime(article.articleContent),
      };

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
        articleCreationTimestamp: {
          gt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
        },
      },
    });

    const articleItems = [];

    for (const article of articles) {
      const creator = await this.helper.getUserById(article.articleCreatorId);

      const articleItem = {
        articleUUID: article.articleUUID,
        articleHeadline: article.articleHeadline,
        articleCatchPhrase: article.articleCatchPhrase,
        articleContent: article.articleContent,
        type: {
          articleType: article.articleType,
          articleTypeName: await this.helper.translateArticleType(article.articleType),
        },
        articleIsPublic: article.articleIsPublic,
        articlePublishTimestamp: article.articlePublishTimestamp,
        articleCreationTimestamp: article.articleCreationTimestamp,
        creator: {
          firstName: creator.firstName,
          lastName: creator.lastName,
        },
        readingTime: await this.helper.computeReadingTime(article.articleContent),
      };

      articleItems.push(articleItem);
    }

    articleItems.sort((a, b) => {
      return b.articleCreationTimestamp.getTime() - a.articleCreationTimestamp.getTime();
    });

    return {
      status: RETURN_DATA.SUCCESS.status,
      data: articleItems,
    };
  }

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
