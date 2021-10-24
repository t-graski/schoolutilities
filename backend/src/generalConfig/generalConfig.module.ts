import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GeneralConfigController } from './generalConfig.controller';
import { GeneralConfigService } from './generalConfig.service';

@Module({
  imports: [DatabaseModule],
  controllers: [GeneralConfigController],
  providers: [GeneralConfigService],
  exports: [GeneralConfigService],
})
export class GeneralConfigModule {}
