// import {
//   Controller,
//   Get,
//   Req,
//   Res,
//   HttpStatus,
//   Post,
//   Body,
//   Put,
//   UseGuards,
// } from '@nestjs/common';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { GeneralConfigService } from './generalConfig.service';

// @Controller('api/generalConfig')
// export class GeneralConfigController {
//   constructor(private readonly generalConfigService: GeneralConfigService) {}

//   @UseGuards(JwtAuthGuard)
//   @Get('/allLanguages')
//   async getAllLanguages(@Req() request, @Res() response) {
//     return response
//       .status(HttpStatus.OK)
//       .send(await this.generalConfigService.getAllLanguages());
//   }
// }
