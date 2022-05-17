import { StatusService } from './status.service';
import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import * as requestIp from 'request-ip';
import { Throttler } from 'src/throttler';
import { Throttle } from '@nestjs/throttler';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddCourseDto } from 'src/dto/course';

@ApiTags('status')
@ApiHeader({
  name: 'Status',
  description: 'To check the serves health',
})
@Controller('api/status')
@UseGuards(Throttler)
export class StatusController {
  constructor(private readonly statusService: StatusService) { }

  @Get('/')
  @ApiResponse({
    status: 200,
    type: AddCourseDto
  })
  @Throttle(3, 10)
  async getStatus(@Req() request) {
    const clientIp = requestIp.getClientIp(request);
    return HttpStatus.OK;
  }
}
