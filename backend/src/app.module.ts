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
// import { CaslModule } from './casl/casl.module';
import { TimezoneModule } from './timezone/timezone.module';

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
    // CaslModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
