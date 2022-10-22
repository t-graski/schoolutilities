import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class NotificationService {

    @Cron('*/30 * * * * *')
    async checkForEvents() {
        
    }
}
