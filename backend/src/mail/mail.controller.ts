import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { MailService } from './mail.service';

@Controller('api/mail')
@UseGuards(RolesGuard)
export class MailController {
  constructor(private readonly mailService: MailService) {}

  // @UseGuards(JwtAuthGuard)
  @Roles(Role.Supervisor)
  @Get('/getUserMails')
  async getMailsSentToUser(@Req() request, @Res() response) {
    const result = await this.mailService.getMailsSentToUser(
      request.body.email,
    );
    return response.status(result?.status).send(result?.data);
  }
}
