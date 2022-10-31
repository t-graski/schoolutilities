import { InjectQueue } from "@nestjs/bull";
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { Queue } from "bull";
import { Observable, tap } from "rxjs";
import { ID_STARTERS } from "../misc/parameterConstants";
import { v4 as uuidv4 } from 'uuid';
import * as jwt from 'jsonwebtoken';
import { SUEmbedBuilder } from "./SUEmbed.builder";
import { Color } from "./color";
import { NotificationBuilder } from "./notification.builder";

const prisma = new PrismaClient();

@Injectable()
export class ExamInterceptor implements NestInterceptor {
    constructor(@InjectQueue('notification') private readonly notificationsQueue: Queue) { }
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization.split(' ')[1];
        const decoded = jwt.decode(authorization);
        const method = request.method;
        //@ts-ignore
        const userUUID = decoded.personUUID;
        let priorExam;
        let exam;

        if (method == "PUT") {
            priorExam = await prisma.timeTableExam.findUnique({
                where: {
                    timeTableExamUUID: request.body.timeTableExamUUID
                },
                include: {
                    schoolRooms: true,
                }
            });
        }

        if (method == "DELETE") {
            exam = exam = await prisma.timeTableExam.findUnique({
                where: {
                    timeTableExamUUID: request.params.examUUID
                },
                include: {
                    schoolRooms: true,
                    timeTableElements: {
                        select: {
                            timeTableElementClasses: {
                                include: {
                                    schoolClasses: {
                                        include: {
                                            schoolClassUsers: {
                                                include: {
                                                    users: {
                                                        include: {
                                                            userDiscordConnections: true
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }

        return next.handle()
            .pipe(tap(async (data) => {
                if (method != "DELETE") {
                    exam = await prisma.timeTableExam.findUnique({
                        where: {
                            timeTableExamUUID: data.timeTableExamUUID
                        },
                        include: {
                            schoolRooms: true,
                            timeTableElements: {
                                select: {
                                    timeTableElementClasses: {
                                        include: {
                                            schoolClasses: {
                                                include: {
                                                    schoolClassUsers: {
                                                        include: {
                                                            users: {
                                                                include: {
                                                                    userDiscordConnections: true
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    });
                }

                const affectedUsers = [];

                exam.timeTableElements.timeTableElementClasses.forEach(element => {
                    element.schoolClasses.schoolClassUsers.forEach(user => {
                        if (user.users.userDiscordConnections.length > 0) {
                            affectedUsers.push({
                                userUUID: user.users.userUUID,
                                discordUserId: user.users.userDiscordConnections[0].discordUserId,
                                discordUserChannelId: user.users.userDiscordConnections[0].discordUserChannelId,
                                examRoom: exam.schoolRooms.schoolRoomName,
                                examDate: exam.timeTableExamDate.getTime() / 1000,
                            });
                        }
                    });
                });

                let jobUUID;
                let message = '';

                switch (method) {
                    case 'POST':
                        for (const user of affectedUsers) {
                            jobUUID = `${ID_STARTERS.NOTIFICATION}${uuidv4()}`
                            message = new NotificationBuilder()
                                .addText('The exam ')
                                .addBold(exam.timeTableExamDescription)
                                .addText(' has been added.')
                                .addNewLine(2)
                                .addBold('Date: ')
                                .addSinceTime(user.examDate)
                                .addNewLine()
                                .addBold('Name: ')
                                .addText(exam.timeTableExamDescription)
                                .addNewLine()
                                .addBold('Room: ')
                                .addText(user.examRoom)
                                .build();
                            await this.notificationsQueue.add('notification', {
                                userUUID: user.userUUID,
                                discordUserId: user.discordUserId,
                                discordUserChannelId: user.discordUserChannelId,
                                url: 'https://schoolutilities.net/school/2acf32a75-426e-48c6-894b-b5fdb2a886ff/planner?tab=timetable&startDate=2022-10-31&schoolClassUUID=453de6c12-f1a5-4bcd-b2ec-05515d46e063&detail=Ta7e602d1-e2e4-44a1-ad17-abc4373edcf0',
                                embed: new SUEmbedBuilder('ⓘ Exam has been added')
                                    .setDescription(message)
                                    .setColor(Color.SUCCESS)
                                    .build(),
                            }, {
                                attempts: 3,
                                removeOnComplete: true,
                                removeOnFail: true,
                                jobId: jobUUID,
                            });

                            await prisma.notifications.create({
                                data: {
                                    notificationUUID: jobUUID,
                                    notificationScheduleTimestamp: new Date(),
                                    users: {
                                        connect: {
                                            userUUID: user.userUUID,
                                        }
                                    },
                                    notificationContent: message,
                                }
                            })
                        }
                        break;
                    case 'PUT':
                        for (const user of affectedUsers) {
                            jobUUID = `${ID_STARTERS.NOTIFICATION}${uuidv4()}`
                            message = new NotificationBuilder()
                                .addText('The exam ')
                                .addBold(priorExam.timeTableExamDescription)
                                .addText(' has been updated.')
                                .addNewLine(2)
                                .addBold('Date: ')
                                .addTimeChange((priorExam.timeTableExamDate.getTime() / 1000).toString(), user.examDate)
                                .addNewLine()
                                .addBold('Name: ')
                                .addNameChange(priorExam.timeTableExamDescription, request.body.timeTableExamDescription)
                                .addNewLine()
                                .addBold('Room: ')
                                .addRoomChange(priorExam.schoolRooms.schoolRoomName, user.examRoom)
                                .build()
                            await this.notificationsQueue.add('notification', {
                                userUUID: user.userUUID,
                                discordUserId: user.discordUserId,
                                discordUserChannelId: user.discordUserChannelId,
                                url: 'https://schoolutilities.net/school/2acf32a75-426e-48c6-894b-b5fdb2a886ff/planner?tab=timetable&startDate=2022-10-31&schoolClassUUID=453de6c12-f1a5-4bcd-b2ec-05515d46e063&detail=Ta7e602d1-e2e4-44a1-ad17-abc4373edcf0',
                                embed: new SUEmbedBuilder('ⓘ Exam has been updated')
                                    .setDescription(message)
                                    .setColor(Color.WARN)
                                    .build(),
                            }, {
                                attempts: 3,
                                removeOnComplete: true,
                                removeOnFail: true,
                                jobId: jobUUID,
                            });

                            await prisma.notifications.create({
                                data: {
                                    notificationUUID: jobUUID,
                                    notificationScheduleTimestamp: new Date(),
                                    users: {
                                        connect: {
                                            userUUID: user.userUUID,
                                        }
                                    },
                                    notificationContent: message,
                                }
                            })
                        }
                        break;
                    case 'DELETE':
                        for (const user of affectedUsers) {
                            jobUUID = `${ID_STARTERS.NOTIFICATION}${uuidv4()}`
                            message = new NotificationBuilder()
                                .addText('The exam ')
                                .addBold(exam.timeTableExamDescription)
                                .addText(' has been deleted.')
                                .build();
                            await this.notificationsQueue.add('notification', {
                                userUUID: user.userUUID,
                                discordUserId: user.discordUserId,
                                discordUserChannelId: user.discordUserChannelId,
                                url: 'https://schoolutilities.net/school/2acf32a75-426e-48c6-894b-b5fdb2a886ff/planner?tab=timetable&startDate=2022-10-31&schoolClassUUID=453de6c12-f1a5-4bcd-b2ec-05515d46e063&detail=Ta7e602d1-e2e4-44a1-ad17-abc4373edcf0',
                                embed: new SUEmbedBuilder('ⓘ Exam has been deleted')
                                    .setDescription(message)
                                    .setColor(Color.SUCCESS)
                                    .build(),
                            }, {
                                attempts: 3,
                                removeOnComplete: true,
                                removeOnFail: true,
                                jobId: jobUUID,
                            });

                            await prisma.notifications.create({
                                data: {
                                    notificationUUID: jobUUID,
                                    notificationScheduleTimestamp: new Date(),
                                    users: {
                                        connect: {
                                            userUUID: user.userUUID,
                                        }
                                    },
                                    notificationContent: message,
                                }
                            })
                        }
                }
            }));
    }
}