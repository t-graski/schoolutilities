import { InjectQueue } from "@nestjs/bull";
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { Queue } from "bull";
import { Observable, tap } from "rxjs";
import { ID_STARTERS } from "../misc/parameterConstants";
import { v4 as uuidv4 } from 'uuid';
import * as jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

@Injectable()
export class NotifcationInterceptor implements NestInterceptor {
    constructor(@InjectQueue('notification') private readonly notificationsQueue: Queue) { }
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization.split(' ')[1];
        const decoded = jwt.decode(authorization);
        //@ts-ignore
        const userUUID = decoded.personUUID;

        return next.handle()
            .pipe(tap(async (data) => {
                const exam = await prisma.timeTableExam.findUnique({
                    where: {
                        timeTableExamUUID: data.timeTableExamUUID
                    },
                    include: {
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

                const affectedUsers = [];

                exam.timeTableElements.timeTableElementClasses.forEach(element => {
                    element.schoolClasses.schoolClassUsers.forEach(user => {
                        affectedUsers.push(user.users.userUUID);
                    });
                });

                if (new Date(exam.timeTableExamDate) < new Date()) {
                    return;
                }

                const ms = new Date(exam.timeTableExamDate).getTime() - new Date(Date.now()).getTime();

                console.log(ms);


                const jobUUID = `${ID_STARTERS.NOTIFICATION}${uuidv4()}`;


                await prisma.notifications.create({
                    data: {
                        notificationUUID: jobUUID,
                        notificationScheduleTimestamp: new Date('1970-10-10'),
                        users: {
                            connect: {
                                userUUID,
                            }
                        },
                        notificationContent: `You will have an exam on the ${request.body.timeTableExamDate} in ${request.body.timeTableExamRoom}`,
                    }
                })

                await this.notificationsQueue.add('notification', {
                    userUUID,
                    message: `You will have an exam on the ${request.body.timeTableExamDate} in ${request.body.timeTableExamRoomUUID}`,
                }, {
                    delay: ms,
                    attempts: 3,
                    removeOnComplete: true,
                    removeOnFail: true,
                    jobId: jobUUID,
                });

            }));
    }
}