import { Controller, Get, Delete, Put, Req, Res, UseGuards, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { ArticleService } from './article.service';

@UseGuards(RolesGuard)
@Controller('api/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @Roles(Role.Supervisor)
  @UseGuards(JwtAuthGuard)
  @Get('/create')
  async createArticle(@Req() request, @Res() response) {
    const result = await this.articleService.createArticle(request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @Roles(Role.Supervisor)
  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  async deleteArticle(@Req() request, @Res() response) {
    const result = await this.articleService.deleteArticle(request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @Roles(Role.Supervisor)
  @UseGuards(JwtAuthGuard)
  @Put('/edit')
  async editArticle(@Req() request, @Res() response) {
    const result = await this.articleService.editArticle(request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @Roles(Role.Supervisor)
  @UseGuards(JwtAuthGuard)
  @Get('/article/:articleUUID')
  async getArticle(@Param() params, @Req() request, @Res() response) {
    const result = await this.articleService.getArticle(request, params.articleUUID);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @Roles(Role.Supervisor)
  @UseGuards(JwtAuthGuard)
  @Get('/articles')
  async getArticles(@Req() request, @Res() response) {
    const result = await this.articleService.getAllArticles(request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }
}
