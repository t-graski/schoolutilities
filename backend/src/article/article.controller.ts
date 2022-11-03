import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AddArticleDTO, Article, DeleteArticleDTO, UpdateArticleDTO } from 'src/entity/article/article';
import { Controller, Get, Delete, Put, Req, Res, UseGuards, Param, Post, UseInterceptors, UploadedFile, HttpStatus, ClassSerializerInterceptor, Body } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { of } from "rxjs";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { editFileName, fileFilter } from "src/misc/fileUpload";
import { LENGTHS } from "src/misc/parameterConstants";
import { Role } from "src/roles/role.enum";
import { Roles } from "src/roles/roles.decorator";
import { RolesGuard } from "src/roles/roles.guard";
import { ArticleService } from "./article.service";

@ApiTags('articles')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(RolesGuard)
@Controller("api/articles")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @ApiOperation({ summary: 'Get one article' })
  @ApiParam({ name: 'articleUUID', type: String })
  @ApiOkResponse({ type: Article })
  @Get('/article/:articleUUID')
  async getArticle(@Param('articleUUID') articleUUID: string, @Req() request: Request): Promise<Article> {
    return this.articleService.getArticle(articleUUID, request);
  }

  @ApiOperation({ summary: 'Get all articles' })
  @ApiOkResponse({ type: [Article] })
  @ApiParam({ name: 'page', type: Number })
  @ApiParam({ name: 'limit', type: Number })
  @Get('/articles/:page/:limit')
  async getArticles(@Param('page') page: number, @Param('limit') limit: number, @Req() request): Promise<Article[] | Article> {
    return this.articleService.getAllArticles(page, limit, request);
  }

  @ApiOperation({ summary: 'Create an article' })
  @ApiCreatedResponse({ type: Article })
  @ApiBody({ type: AddArticleDTO })
  @Roles(Role.Supervisor)
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createArticle(@Body() article: AddArticleDTO, @Req() request: Request): Promise<Article> {
    return this.articleService.createArticle(article, request);
  }

  @ApiOperation({ summary: 'Edit an article' })
  @ApiOkResponse({ type: Article })
  @ApiBody({ type: UpdateArticleDTO })
  @Roles(Role.Supervisor)
  @UseGuards(JwtAuthGuard)
  @Put('/edit')
  async editArticle(@Body() article: UpdateArticleDTO, @Req() request: Request): Promise<Article> {
    return this.articleService.editArticle(article, request);
  }

  @ApiOperation({ summary: 'Delete an article' })
  @ApiBody({ type: DeleteArticleDTO })
  @Roles(Role.Supervisor)
  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  async deleteArticle(@Body() article: DeleteArticleDTO, @Req() request: Request): Promise<Article> {
    return this.articleService.deleteArticle(article, request);
  }

  @Post("/uploadFile")
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "../files",
        filename: editFileName,
      }),
      fileFilter: fileFilter,
      limits: { fileSize: LENGTHS.MAX_FILE_SIZE },
    }),
  )
  async uploadFile(@Req() request, @Res() response, @UploadedFile() file) {
    const result = await this.articleService.uploadFile(file, request);
    return response.status(result.status).json(result?.message);
  }

  @Get("/files/:articleUUID")
  async getArticleFiles(@Param("articleUUID") articleUUID: string, @Req() request, @Res() response) {
    const result = await this.articleService.getArticleFiles(articleUUID);
    return response.status(result.status).json(result?.data ? result.data : result.message);
  }

  @Get("/file/:fileUUID")
  async getArticleFile(@Param("fileUUID") fileUUID: string, @Req() request, @Res() response) {
    return of(response.status(HttpStatus.OK).sendFile(`${fileUUID}`, { root: process.env.LOGO_PATH }));
  }
}
