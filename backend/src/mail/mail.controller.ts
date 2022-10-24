import { Body, Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetLogEmailDTO, LogEmail } from 'src/entity/log/email';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { MailService } from './mail.service';

@Controller('api/mail')
@UseGuards(RolesGuard)
export class MailController {
  constructor(private readonly mailService: MailService) { }

  @ApiOperation({ summary: 'Get all mails sent to a user' })
  @ApiOkResponse({ type: [LogEmail] })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Supervisor)
  @Get('/getUserMails')
  async getMailsSentToUser(@Body() mail: GetLogEmailDTO, @Req() request): Promise<LogEmail[]> {
    return this.mailService.getMailsSentToUser(request.body.email);
  }
}
