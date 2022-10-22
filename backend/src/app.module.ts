import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CourseModule } from './course/course.module';
import { SchoolAdminModule } from './schoolAdmin/schoolAdmin.module';
import { FileUploadModule } from './file/file.module';
import { StatisticsModule } from './statistics/statistics.module';
import { TimezoneModule } from './timezone/timezone.module';
import { UserModule } from './user/user.module';
import { AssetsModule } from './assets/assets.module';
import { StatusModule } from './status/status.module';
import { HelperModule } from './helper/helper.module';
import { ArticleService } from './article/article.service';
import { ArticleController } from './article/article.controller';
import { ArticleModule } from './article/article.module';
import { TimetableModule } from './timetable/timetable.module';
import { UntisImportModule } from './untis-import/untis-import.module';
import { PrismaService } from './prisma.service';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    SchoolAdminModule,
    CourseModule,
    FileUploadModule,
    StatisticsModule,
    TimezoneModule,
    UserModule,
    AssetsModule,
    StatusModule,
    HelperModule,
    ArticleModule,
    TimetableModule,
    UntisImportModule,
    UserModule,
    ScheduleModule.forRoot(),
    NotificationModule,
  ],
  controllers: [AppController, ArticleController],
  providers: [AppService, ArticleService, PrismaService],
})
export class AppModule { }
