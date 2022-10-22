import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ConnectDiscordDTO, DisconnectDiscordDTO, DiscordUser } from 'src/entity/discord-user/discordUser';
import { RolesGuard } from 'src/roles/roles.guard';
import { UserService } from './user.service';
import { Request } from 'express';

@ApiBearerAuth()
@ApiTags('users')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('api/user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: 'Connect a user to discord' })
  @ApiBody({ type: ConnectDiscordDTO })
  @ApiCreatedResponse({ type: DiscordUser })
  @UseGuards(JwtAuthGuard)
  @Post('/discord/connect')
  async connectDiscord(@Body() discord: ConnectDiscordDTO, @Req() request: Request): Promise<DiscordUser> {
    return this.userService.connectDiscord(discord, request);
  }

  @ApiOperation({ summary: 'Disconnect a user from discord' })
  @ApiResponse({ type: Number })
  @ApiBody({ type: DisconnectDiscordDTO })
  @UseGuards(JwtAuthGuard)
  @Delete('/discord/disconnect')
  async disconnectDiscord(@Body() discord: DisconnectDiscordDTO, @Req() request: Request): Promise<number> {
    return this.userService.disconnectDiscord(discord, request);
  }

  @Post('/requestPasswordReset')
  async requestPasswordReset(@Req() request, @Res() response) {
    const result = await this.userService.requestPasswordReset(request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @Post('/passwordReset')
  async passwordReset(@Req() request, @Res() response) {
    const result = await this.userService.passwordReset(request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/requestEmailChange')
  async requestEmailChange(@Req() request, @Res() response) {
    const result = await this.userService.requestEmailChange(request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @Post('/verifyEmailChange')
  async verifyEmailChange(@Req() request, @Res() response) {
    const result = await this.userService.verifyEmailChange(request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getSchools')
  async getSchools(@Res() response, @Req() request) {
    const jwt = request.headers.authorization.split(' ')[1];
    const result = await this.userService.getSchools(jwt);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Res() response, @Req() request) {
    const jwt = request.headers.authorization.split(' ')[1];
    const result = await this.userService.getProfile(jwt);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/publicProfile')
  async getPublicProfile(@Res() response, @Req() request) {
    const result = await this.userService.getPublicProfile(request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/updateUserSettings')
  async updateUserSettings(@Req() request, @Res() response) {
    const result = await this.userService.updateUserSettings(request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/updatePublicProfile')
  async updatePublicProfile(@Req() request, @Res() response) {
    const result = await this.userService.updatePublicProfile(request);
    return response
      .status(result.status)
      .json(result?.data ? result.data : result.message);
  }
}
