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
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BullModule } from '@nestjs/bull';
import { NotificationModule } from './notification/notification.module';
const dotenv = require('dotenv');
dotenv.config();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HELLO_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URL],
          queue: 'user_messages',
          noAck: false,
        },
      },
    ]),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      }
    }),
    ArticleModule,
    AssetsModule,
    AuthModule,
    CourseModule,
    FileUploadModule,
    HelperModule,
    NotificationModule,
    SchoolAdminModule,
    StatisticsModule,
    StatusModule,
    TimetableModule,
    TimezoneModule,
    UntisImportModule,
    UserModule,
    UserModule,
    UsersModule,
  ],
  controllers: [AppController, ArticleController],
  providers: [AppService, ArticleService, PrismaService],
})
export class AppModule { }
