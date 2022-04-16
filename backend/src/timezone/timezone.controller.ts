import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { TimezoneService } from './timezone.service';

@Controller('api/timezone')
@UseGuards(RolesGuard)
export class TimezoneController {
  constructor(private readonly timezoneService: TimezoneService) {}

  @Post('/importTimezones')
  // @Roles(Role.Supervisor)
  async importTimezones(@Req() request, @Res() response) {
    const result = await this.timezoneService.importTimezones();
    return response.status(result?.status).json(result?.message);
  }

  //route for get by name
  @Post('/getTimezoneByName')
  async getTimezoneByName(@Req() request, @Res() response) {
    const result = await this.timezoneService.getTimezoneByName(request.body);
    return response.status(result?.status).json(result?.message);
  }
}
