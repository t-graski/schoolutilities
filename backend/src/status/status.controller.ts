import { StatusService } from './status.service';
import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import * as requestIp from 'request-ip';
import { Throttler } from 'src/throttler';
import { Throttle } from '@nestjs/throttler';

@Controller('api/status')
@UseGuards(Throttler)
export class StatusController {
  constructor(private readonly statusService: StatusService) { }

  @Get('/')
  @Throttle(3, 10)
  async getStatus(@Req() request) {
    const clientIp = requestIp.getClientIp(request);
    return HttpStatus.OK;
  }
}
