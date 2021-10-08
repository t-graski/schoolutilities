import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SchoolAdminModule } from './schoolAdmin/schoolAdmin.module';
import { GeneralConfigModule } from './generalConfig/generalConfig.module';

@Module({
  imports: [AuthModule, UsersModule, SchoolAdminModule, GeneralConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
