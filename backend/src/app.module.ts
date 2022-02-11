import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CourseModule } from './course/course.module';
import { SchoolAdminModule } from './schoolAdmin/schoolAdmin.module';
import { GeneralConfigModule } from './generalConfig/generalConfig.module';
import { FileUploadModule } from './file/file.module';
import { StatisticsModule } from './statistics/statistics.module';
import { TimezoneModule } from './timezone/timezone.module';
import { UserModule } from './user/user.module';
import { AssetsModule } from './assets/assets.module';
import { StatusModule } from './status/status.module';
import { HelperModule } from './helper/helper.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    SchoolAdminModule,
    GeneralConfigModule,
    CourseModule,
    FileUploadModule,
    StatisticsModule,
    TimezoneModule,
    UserModule,
    AssetsModule,
    StatusModule,
    HelperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
