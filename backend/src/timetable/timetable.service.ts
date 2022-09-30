import { ConsoleLogger, Injectable } from '@nestjs/common';
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
                        schoolRoom: {
                            connect: {
                                schoolRoomId: element.timeTableRoomId
                            },
                        },
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
        const timeTableData = []

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
                    },
                    timeTableOmitted: true,
                },
            })

            const holidays = await prisma.schoolClasses.findUnique({
                where: {
                    schoolClassUUID: classUUID,
                },
                include: {
                    departments: {
                        include: {
                            schools: {
                                include: {
                                    holidays: {
                                        where: {
                                            holidayStartDate: {
                                                gte: new Date(dateString),
                                            }
                                        }
                                    },
                                }
                            }
                        }
                    }
                }
            })

            let i = 0
            timeTable.forEach((element) => {
                timeTableData.push({
                    timeTableElementUUID: element.timeTableElementUUID,
                    timeTableElementStartTime: new Date(new Date(dateString).setHours(element.timeTableElementStartTime.getHours(), element.timeTableElementStartTime.getMinutes(), 0, 0) + 86400000 * i).toISOString(),
                    timeTableElementEndTime: new Date(new Date(dateString).setHours(element.timeTableElementEndTime.getHours(), element.timeTableElementEndTime.getMinutes(), 0, 0) + 86400000 * i).toISOString(),
                    timeTableElementDay: element.timeTableElementDay,
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
                    substitution: checkForSubstitution(element, new Date(dateString)),
                    event: checkForEvent(element, new Date(dateString)),
                    omitted: element.timeTableOmitted.length > 0 ? {
                        timeTableOmittedReason: element.timeTableOmitted[0].timeTableElementOmittedReason,
                        timeTableOmittedDate: element.timeTableOmitted[0].timeTableElementOmittedDate,
                    } : undefined,
                })
                i++
            })

            function checkForEvent(element, monday) {
                if (element.timeTableEvents.length > 0) {
                    if (element.timeTableEvents[0].timeTableEventDate >= monday && element.timeTableEvents[0].timeTableEventDate <= new Date(monday.setDate(monday.getDate() + 5))) {
                        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                        let day = weekday[element.timeTableEvents[0].timeTableEventDate.getDay()]
                        if (element.timeTableElementDay === day) {
                            return {
                                timeTableEventUUID: element.timeTableEvents[0].timeTableEventUUID,
                                timeTableEventName: element.timeTableEvents[0].timeTableEventName,
                                timeTableEventDate: element.timeTableEvents[0].timeTableEventDate,
                                timeTableEventStartTime: element.timeTableEvents[0].timeTableEventStartTime,
                                timeTableEventEndTime: element.timeTableEvents[0].timeTableEventEndTime,
                                timeTableEventIsAllDay: element.timeTableEvents[0].timeTableEventIsAllDay,
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

            function checkForSubstitution(element, monday) {
                if (element.timeTableSubstitutions.length > 0) {
                    if (element.timeTableSubstitutions[0].timeTableSubstitutionDate >= monday && element.timeTableSubstitutions[0].timeTableSubstitutionDate <= new Date(monday.setDate(monday.getDate() + 5))) {
                        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                        let day = weekday[element.timeTableSubstitutions[0].timeTableSubstitutionDate.getDay()]
                        if (element.timeTableElementDay === day) {
                            return {
                                timeTableSubstitutionUUID: element.timeTableSubstitutions[0].timeTableSubstitutionUUID,
                                timeTableSubstitutionDate: element.timeTableSubstitutions[0].timeTableSubstitutionDate,
                                timeTableSubstitutionStartTime: element.timeTableSubstitutions[0].timeTableSubstitutionStartTime,
                                timeTableSubstitutionEndTime: element.timeTableSubstitutions[0].timeTableSubstitutionEndTime,
                                timeTableSubstitutionClasses: element.timeTableSubstitutions[0].timeTableSubstitutionClasses.map((classes) => {
                                    return {
                                        schoolClassUUID: classes.classes.schoolClassUUID,
                                        schoolClassName: classes.classes.schoolClassName,
                                        schoolClassCreationTimestamp: classes.classes.schoolClassCreationTimestamp,
                                    }
                                }),
                                timeTableSubstitutionTeachers: element.timeTableSubstitutions[0].timeTableSubstitutionTeachers.map((teacher) => {
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

            let timeTableDaysArray = Object.keys(timeTableDays).map((key) => {
                return {
                    day: key,
                    timeTableElements: timeTableDays[key]
                }
            });

            timeTableDaysArray.forEach((element) => {
                let holiday = checkForHoliday(element)

                if (holiday !== undefined) {
                    element.timeTableElements.length = 0
                    element.timeTableElements.push({
                        holidayUUID: holiday.holidayUUID,
                        holidayName: holiday.holidayName,
                        holidayStartDate: holiday.holidayStartDate,
                        holidayEndDate: holiday.holidayEndDate,
                    })
                }

                let allDayEvent = element.timeTableElements.find((element) => {
                    return element.event !== undefined && element.event.timeTableEventIsAllDay === true
                })

                if (allDayEvent !== undefined) {
                    element.timeTableElements.forEach((element) => {
                        element.event = allDayEvent.event
                    })
                }
            })

            function checkForHoliday(element) {
                const holiday = holidays.departments.schools.holidays.find((holiday) => {
                    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                    let day = weekday[holiday.holidayStartDate.getDay() - 1]

                    if (day === element.day) {
                        return true
                    }
                })

                if (holiday !== undefined) {
                    return holiday
                }

                return undefined
            }

            timeTableDaysArray.forEach((element) => {
                element.timeTableElements.sort((a, b) => {
                    //sort by starttime
                    return a.timeTableElementStartTime - b.timeTableElementStartTime;
                });
            }) 

            return {
                status: 200,
                data: timeTableDaysArray,
            }
        } catch (error) {
            console.log(error)
            return RETURN_DATA.DATABASE_ERROR;
        }
    }

    async addHoliday(holiday, request): Promise<ReturnMessage> {
        const { schoolUUID, holidayName, holidayStartDate, holidayEndDate } = holiday;

        try {
            const holiday = await prisma.holidays.create({
                data: {
                    holidayUUID: `${ID_STARTERS.HOLIDAYS}${uuidv4()}`,
                    holidayName,
                    holidayStartDate: new Date(holidayStartDate),
                    holidayEndDate: new Date(holidayEndDate),
                    schools: {
                        connect: {
                            schoolUUID,
                        },
                    },
                }
            });
            return {
                status: RETURN_DATA.SUCCESS.status,
                data: {
                    holidayUUID: holiday.holidayUUID,
                    holidayName: holiday.holidayName,
                    holidayStartDate: holiday.holidayStartDate,
                    holidayEndDate: holiday.holidayEndDate,
                },
            }
        } catch {
            return RETURN_DATA.DATABASE_ERROR;
        }

    }

    async getHolidayOfSchool(schoolUUID: string): Promise<ReturnMessage> {
        try {
            const holidays = await prisma.schools.findUnique({
                where: {
                    schoolUUID,
                },
                include: {
                    holidays: true,
                }
            });

            return {
                status: RETURN_DATA.SUCCESS.status,
                data: {
                    holidays: holidays.holidays.map((holiday) => {
                        return {
                            holidayUUID: holiday.holidayUUID,
                            holidayName: holiday.holidayName,
                            holidayStartDate: holiday.holidayStartDate,
                            holidayEndDate: holiday.holidayEndDate,
                        }
                    }),
                },
            }
        } catch {
            return RETURN_DATA.DATABASE_ERROR;
        }
    }

    async addExam(exam, request): Promise<ReturnMessage> {
        const { timeTableElementUUID, timeTableExamRoomId, timeTableExamDescription } = exam;

        try {
            const exam = await prisma.timeTableExam.create({
                data: {
                    timeTableExamUUID: `${ID_STARTERS.EXAM}${uuidv4()}`,
                    timeTableExamRoomId,
                    timeTableExamDescription,
                    timeTableElements: {
                        connect: {
                            timeTableElementUUID,
                        },
                    },
                }
            })
            return {
                status: RETURN_DATA.SUCCESS.status,
                data: {
                    timeTableExamUUID: exam.timeTableExamUUID,
                    timeTableExamRoomId: exam.timeTableExamRoomId,
                    timeTableExamDescription: exam.timeTableExamDescription,
                },
            }
        } catch (err) {
            console.log(err)
            return RETURN_DATA.DATABASE_ERROR;
        }
    }
}
