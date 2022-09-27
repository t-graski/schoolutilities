import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { DatabaseService } from 'src/database/database.service';
import { AddTimeTableDto, TimeTableDay, TimeTableElement } from 'src/dto/addTimeTable';
import { HelperService } from 'src/helper/helper.service';
import { ID_STARTERS, RETURN_DATA } from 'src/misc/parameterConstants';
import { Role } from 'src/roles/role.enum';
import { ReturnMessage } from 'src/types/Course';
import { v4 as uuidv4 } from 'uuid';

require('dotenv').config();
const prisma = new PrismaClient();

@Injectable()
export class TimetableService {
    constructor(
        private readonly helper: HelperService,
    ) { }

    async createTimetable(payload: AddTimeTableDto, request): Promise<ReturnMessage> {
        const token = await this.helper.extractJWTToken(request);
        const creatorUUID = await this.helper.getUserUUIDfromJWT(token);

        payload.timetableDay.forEach(async (day) => {
            day.timeTableElements.forEach(async (element) => {
                await prisma.timeTableElement.create({
                    data: {
                        timeTableElementUUID: `${ID_STARTERS.TIME_TABLE_ELEMENT}${uuidv4()}`,
                        schoolSubjects: {
                            connect: {
                                schoolSubjectId: element.timetableElementSubjectId
                            },
                        },
                        timeTableElementRoomId: 0,
                        timeTableElementStartTime: new Date(element.timeTableElementStartTime),
                        timeTableElementEndTime: new Date(element.timeTableElementEndTime),
                        timeTableElementDay: day.timeTableDay,
                        users: {
                            connect: {
                                userUUID: creatorUUID,
                            }
                        },
                        timetableElementTeachers: {
                            create: element.timeTableElementTeachers.map((teacherUUID) => {
                                return {
                                    users: {
                                        connect: {
                                            userUUID: teacherUUID,
                                        },
                                    },
                                }
                            }),
                        },
                        timeTableElementClasses: {
                            create: element.timeTableElementClasses.map((classUUID) => {
                                return {
                                    schoolClasses: {
                                        connect: {
                                            schoolClassUUID: classUUID,
                                        },
                                    },
                                }
                            }),
                        },
                    },
                });
            });
        });

        return RETURN_DATA.SUCCESS
    }

    async getTimetable(classUUID: string, request): Promise<ReturnMessage> {
        const timeTableData = [];
        try {
            const timeTable = await prisma.timeTableElement.findMany({
                where: {
                    timeTableElementClasses: {
                        some: {
                            schoolClasses: {
                                schoolClassUUID: classUUID,
                            }
                        }
                    }
                },
                include: {
                    schoolSubjects: true,
                    timetableElementTeachers: {
                        include: {
                            users: true,
                        },
                    }
                },
            });

            timeTable.forEach((element) => {
                timeTableData.push({
                    timeTableElementUUID: element.timeTableElementUUID,
                    timeTableElementStartTime: element.timeTableElementStartTime,
                    timeTableElementEndTime: element.timeTableElementEndTime,
                    timeTableElementDay: element.timeTableElementDay,
                    timeTableElementCreationTimestamp: element.timeTableElementCreationTimestamp,
                    schoolSubjectName: element.schoolSubjects.schoolSubjectName,
                    timeTableElementTeachers: element.timetableElementTeachers.map((teacher) => {
                        return {
                            userUUID: teacher.users.userUUID,
                            userFirstname: teacher.users.userFirstname,
                            userLastname: teacher.users.userLastname,
                            userBirthDate: teacher.users.userBirthDate,
                            userEmail: teacher.users.userEmail,
                            userEmailVerified: teacher.users.userEmailVerified,
                            userCreationTimestamp: teacher.users.userCreationTimestamp,
                            userLastLoginTimestamp: teacher.users.userLastLoginTimestamp,
                        }
                    }),
                })
            });

            const timeTableDays = timeTableData.reduce((r, a) => {
                r[a.timeTableElementDay] = [...r[a.timeTableElementDay] || [], a];
                return r;
            }, {});

            return {
                status: 200,
                data: timeTableDays,
            }
        } catch {
            return RETURN_DATA.DATABASE_ERROR;
        }
    }
}
