import { Module } from '@nestjs/common';
import { SchoolAdminService } from './schoolAdmin.service';
import { SchoolAdminController } from './schoolAdmin.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SchoolAdminController],
  providers: [SchoolAdminService],
  exports: [SchoolAdminService],
})
export class SchoolAdminModule {}
