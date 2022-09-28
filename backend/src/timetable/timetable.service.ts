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
                        timetableTeachers: {
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

    async getTimetable(classUUID: string, dateString: string, request): Promise<ReturnMessage> {
        const date = new Date(dateString)
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
                    timetableTeachers: {
                        include: {
                            users: true,
                        },
                    },
                    timeTableSubstitutions: {
                        include: {
                            timeTableSubstitutionClasses: {
                                include: {
                                    classes: true,
                                },
                            },
                            timeTableSubstitutionTeachers: {
                                include: {
                                    users: true,
                                },
                            }
                        }
                    },
                    timeTableEvents: {
                        include: {
                            timeTableEventClasses: {
                                include: {
                                    classes: true,
                                },
                            },
                            timeTableEventTeachers: {
                                include: {
                                    users: true,
                                },
                            },
                        }
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
                    timeTableElementTeachers: element.timetableTeachers.map((teacher) => {
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
                    event: checkForEvent(element),
                    substitution: checkForSubstitution(element),
                })



            });

            function checkForEvent(element) {
                if (element.timeTableEvents.length > 0) {
                    if (element.timeTableEvents[0].timeTableEventDate >= date && element.timeTableEvents[0].timeTableEventDate <= new Date(date.setDate(date.getDate() + 5))) {
                        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                        let day = weekday[element.timeTableEvents[0].timeTableEventDate.getDay()]
                        if (element.timeTableElementDay === day) {
                            return {
                                timeTableEventUUID: element.timeTableEvents[0].timeTableEventUUID,
                                timeTableEventName: element.timeTableEvents[0].timeTableEventName,
                                timeTableEventDate: element.timeTableEvents[0].timeTableEventDate,
                                timeTableEventStartTime: element.timeTableEvents[0].timeTableEventStartTime,
                                timeTableEventEndTime: element.timeTableEvents[0].timeTableEventEndTime,
                                timeTableEventTeachers: element.timeTableEvents[0].timeTableEventTeachers.map((teacher) => {
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
                                }
                                ),
                                timeTableEventClasses: element.timeTableEvents[0].timeTableEventClasses.map((classs) => {
                                    return {
                                        schoolClassUUID: classs.classes.schoolClassUUID,
                                        schoolClassName: classs.classes.schoolClassName,
                                        schoolClassCreationTimestamp: classs.classes.schoolClassCreationTimestamp,
                                    }
                                }
                                ),
                            }
                        }
                    }
                }
                return undefined
            }

            function checkForSubstitution(element) {
                if (element.timeTableSubstitutions.length > 0) {
                    console.log(element.timeTableSubstitutions)
                    if (element.timeTableSubstitutions[0].timeTableSubstitutionDate >= date && element.timeTableSubstitutions[0].timeTableSubstitutionDate <= new Date(date.setDate(date.getDate() + 5))) {
                        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                        let day = weekday[element.timeTableSubstitutions[0].timeTableSubstitutionDate.getDay()]
                        if (element.timeTableElementDay === day) {
                            return {
                                timeTableSubstitutionUUID: element.timeTableSubstitutions[0].timeTableSubstitutionUUID,
                                timeTableSubstitutionDate: element.timeTableSubstitutions[0].timeTableSubstitutionDate,
                                timeTableSubstitutionStartTime: element.timeTableSubstitutions[0].timeTableSubstitutionStartTime,
                                timeTableSubstitutionEndTime: element.timeTableSubstitutions[0].timeTableSubstitutionEndTime,
                                timeTableSubstitutionClasses: element.timeTableSubstitutions[0].timeTableSubstitutionClasses.map((classUUID) => {
                                    return classUUID.classes.schoolClassUUID
                                }),
                                timeTableSubstitutionTeachers: element.timeTableSubstitutions[0].timeTableSubstitutionTeachers.map((teacherUUID) => {
                                    return teacherUUID.users.userUUID
                                }),
                                timeTableSubstitutionSubjectName: element.timeTableSubstitutions[0].timeTableSubstitutionSubjectName,
                            }
                        }
                    }
                }

                return undefined
            }

            timeTableData.sort((a, b) => {
                return a.timeTableElementStartTime - b.timeTableElementStartTime;
            });

            const timeTableDays = timeTableData.reduce((r, a) => {
                r[a.timeTableElementDay] = [...r[a.timeTableElementDay] || [], a];
                return r;
            }, {});

            return {
                status: 200,
                data: timeTableDays,
            }
        } catch (error) {
            console.log(error)
            return RETURN_DATA.DATABASE_ERROR;
        }
    }
}
