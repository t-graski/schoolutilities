import { StatusService } from './status.service';
import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import * as requestIp from 'request-ip';

@Controller('api/status')
export class StatusController {
  constructor(private readonly statusService: StatusService) { }

  @Get('/')
  async getStatus(@Req() request) {
    const clientIp = requestIp.getClientIp(request);
    return HttpStatus.OK;
  }
}
