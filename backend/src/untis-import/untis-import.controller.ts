import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UntisImportService } from './untis-import.service';

@Controller('api/untis')
export class UntisImportController {
  constructor(private readonly untisImportService: UntisImportService) { }

  // @UseGuards(JwtAuthGuard)
  @Post("")
  async importUntis(@Body() importUntis, @Req() request, @Res() response) {
    const result = await this.untisImportService.importUntis(importUntis, request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }
}
