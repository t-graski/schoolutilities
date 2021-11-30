import {
  Controller,
  Get,
  Delete,
  Req,
  Res,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { StatisticsService } from './statistics.service';

@Controller('api/statistics')
@UseGuards(RolesGuard)
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}
}
