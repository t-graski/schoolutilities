import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaClient } from '@prisma/client';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { Channel } from 'discord.js';

const prisma = new PrismaClient();

@Injectable()
export class NotificationService {

    //cron for every 30 seconds
    @Cron('*/30 * * * * *')
    async checkForEvents() {
        const events = await prisma.courseFileSubmissionSettings.findMany({
            where: {
                courseFileSubmissionDueTimestamp: {

                }
            },
            include: {
                courseElements: {
                    include: {
                        courses: {
                            include: {
                                courseUsers: {
                                    include: {
                                        users: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        const discordUser = await prisma.userDiscordConnections.findMany({
            where: {
                userId: 1,
            }
        });
        // await this.sendDiscordNotification(discordUser);
        // console.log(events);

    }

    async sendDiscordNotification(notification: any) {
        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

        console.log(notification);


        try {
            let channel: Channel = await rest.post(Routes.userChannels(), {
                body: {
                    recipient_id: notification[0].discordUserId,
                },
            }) as Channel;

            // console.log(channel);

            await rest.post(Routes.channelMessages(notification[0].discordUserChannelId), {
                body: {
                    content: "Hello, World!",
                    embeds: [{
                        title: "Hello, Embed!",
                        description: "This is an embedded message."
                    }]
                },
            })
        } catch (err) {
            console.log(err);
            throw new InternalServerErrorException('Discord Notification failed!');
        }
    }
}
