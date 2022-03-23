import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/roles/roles.guard';
import { ArticleService } from './article.service';

@UseGuards(RolesGuard)
@Controller('api/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('/create')
  async createArticle(@Req() request, @Res() response) {
    const result = await this.articleService.createArticle(request);
  }
}
