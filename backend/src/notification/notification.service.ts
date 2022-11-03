import { InjectQueue } from '@nestjs/bull/dist/decorators';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaClient } from '@prisma/client';
import { Queue } from 'bull';

const prisma = new PrismaClient();

@Injectable()
export class NotificationService {
    constructor(@InjectQueue('notification') private readonly notificationsQueue: Queue) { }


    // @Cron('*/10 * * * * *')
    async handleCron() {
        // const job = await this.notificationsQueue.add('notification', {
        //     title: 'Test',
        // },
        //     {
        //         delay: 10000,
        //         attempts: 3,
        //         removeOnComplete: true,
        //         removeOnFail: true,
        //     }
        // );

        //get job by id
        // const job = await this.notificationsQueue.getJob('Need33622-af77-4cc3-bad1-2eadce53cc1e');
        // console.log(job);

        // console.log(new TimeTableNotificationBuilder().addMessage("You have an exam").addExam("Maths").build());

        // console.log('job started', new Date().toLocaleTimeString());

        // console.log(job);

    }
}