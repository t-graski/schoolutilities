import { InjectQueue } from '@nestjs/bull/dist/decorators';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaClient } from '@prisma/client';
import { Queue } from 'bull';

const prisma = new PrismaClient();

@Injectable()
export class NotificationService {
    constructor(@InjectQueue('notification') private readonly notificationsQueue: Queue) { }


    @Cron('*/10 * * * * *')
    async handleCron() {
        const job = await this.notificationsQueue.add('notification', {
            title: 'Test',
        },
            {
                delay: 10000,
            }
        );

        console.log('job started', new Date().toLocaleTimeString());

        // console.log(job);

    }
}
