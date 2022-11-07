import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { AddExamDTO, Exam, UpdateExamDTO } from 'src/entity/exam/exam';
import { SchoolRoom } from 'src/entity/school-room/schoolRoom';
import { HelperService } from 'src/helper/helper.service';
import { ID_STARTERS, RETURN_DATA } from 'src/misc/parameterConstants';
import { ReturnMessage } from 'src/types/Database';
import { v4 as uuidv4 } from 'uuid';

require('dotenv').config();
const prisma = new PrismaClient();

@Injectable()
export class TimetableService {
    constructor(private readonly helper: HelperService) { }

    async createTimetable(
        payload,
        request,
    ): Promise<ReturnMessage> {
        const token = await this.helper.extractJWTToken(request);
        const creatorUUID = await this.helper.getUserUUIDfromJWT(token);

        payload.timetableDay.forEach(async (day) => {
            day.timeTableElements.forEach(async (element) => {
                await prisma.timeTableElement.create({
                    data: {
                        timeTableElementUUID: `${ID_STARTERS.TIME_TABLE_ELEMENT
                            }${uuidv4()}`,
                        schoolSubjects: {
                            connect: {
                                schoolSubjectId: element.timetableElementSubjectId,
                            },
                        },
                        schoolRoom: {
                            connect: {
                                schoolRoomId: element.timeTableRoomId,
                            },
                        },
                        timeTableElementStartTime: new Date(
                            element.timeTableElementStartTime,
                        ),
                        timeTableElementEndTime: new Date(element.timeTableElementEndTime),
                        timeTableElementDay: day.timeTableDay,
                        users: {
                            connect: {
                                userUUID: creatorUUID,
                            },
                        },
                        timeTableTeachers: {
                            create: element.timeTableElementTeachers.map((teacherUUID) => {
                                return {
                                    users: {
                                        connect: {
                                            userUUID: teacherUUID,
                                        },
                                    },
                                };
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
                                };
                            }),
                        },
                    },
                });
            });
        });

        return RETURN_DATA.SUCCESS;
    }

    async addTimeTableElement(
        payload,
        request: Request,
    ): Promise<ReturnMessage> {
        const {
            timeTableElementStartTime,
            timeTableElementEndTime,
            timeTableElementDay,
            schoolSubject,
            timeTableElementTeachers,
            timeTableElementRoomUUID,
            timeTableElementClasses,
        } = payload;

        try {
            const token = await this.helper.extractJWTToken(request);
            const creatorUUID = await this.helper.getUserUUIDfromJWT(token);

            const element = await prisma.timeTableElement.create({
                data: {
                    timeTableElementUUID: `${ID_STARTERS.TIME_TABLE_ELEMENT}${uuidv4()}`,
                    timeTableElementDay,
                    schoolSubjects: {
                        connect: {
                            schoolSubjectUUID: schoolSubject.schoolSubjectUUID,
                        },
                    },
                    schoolRoom: {
                        connect: {
                            schoolRoomUUID: timeTableElementRoomUUID,
                        },
                    },
                    timeTableElementStartTime: new Date(timeTableElementStartTime),
                    timeTableElementEndTime: new Date(timeTableElementEndTime),
                    users: {
                        connect: {
                            userUUID: creatorUUID,
                        },
                    },
                    timeTableTeachers: {
                        create: timeTableElementTeachers.map((teacherUUID) => {
                            return {
                                users: {
                                    connect: {
                                        userUUID: teacherUUID,
                                    },
                                },
                            };
                        }),
                    },
                    timeTableElementClasses: {
                        create: timeTableElementClasses.map((classUUID) => {
                            return {
                                schoolClasses: {
                                    connect: {
                                        schoolClassUUID: classUUID,
                                    },
                                },
                            };
                        }),
                    },
                }, include: {
                    schoolSubjects: true,
                }
            });
            return {
                status: 201,
                data: {
                    ...element,
                    schoolSubject: {
                        schoolSubjectUUID: element.schoolSubjects.schoolSubjectUUID,
                        schoolSubjectName: element.schoolSubjects.schoolSubjectName,
                        schoolSubjectAbbreviation: element.schoolSubjects.schoolSubjectAbbreviation,
                    }
                },
            };
        } catch {
            throw new InternalServerErrorException('Database error');
        }
    }

    async updateTimeTableElement(
        payload,
        request: Request,
    ): Promise<ReturnMessage> {
        const {
            timeTableElementUUID,
            timeTableElementStartTime,
            timeTableElementDay,
            timeTableElementEndTime,
            schoolSubject,
            timeTableElementTeachers,
            timeTableElementRoomUUID,
            timeTableElementClasses,
        } = payload;

        try {
            const token = await this.helper.extractJWTToken(request);
            const creatorUUID = await this.helper.getUserUUIDfromJWT(token);

            await prisma.timeTableElementClasses.deleteMany({
                where: {
                    timeTableElements: {
                        timeTableElementUUID,
                    },
                },
            });

            await prisma.timeTableElementTeachers.deleteMany({
                where: {
                    timeTableElements: {
                        timeTableElementUUID,
                    },
                },
            });

            const element = await prisma.timeTableElement.update({
                where: {
                    timeTableElementUUID,
                },
                data: {
                    timeTableElementDay,
                    schoolSubjects: {
                        connect: {
                            schoolSubjectUUID: schoolSubject.schoolSubjectUUID,
                        },
                    },
                    schoolRoom: {
                        connect: {
                            schoolRoomUUID: timeTableElementRoomUUID,
                        },
                    },
                    timeTableElementStartTime: new Date(timeTableElementStartTime),
                    timeTableElementEndTime: new Date(timeTableElementEndTime),
                    users: {
                        connect: {
                            userUUID: creatorUUID,
                        },
                    },
                    timeTableTeachers: {
                        create: timeTableElementTeachers.map((teacherUUID) => {
                            return {
                                users: {
                                    connect: {
                                        userUUID: teacherUUID,
                                    },
                                },
                            };
                        }),
                    },
                    timeTableElementClasses: {
                        create: timeTableElementClasses.map((classUUID) => {
                            return {
                                schoolClasses: {
                                    connect: {
                                        schoolClassUUID: classUUID,
                                    },
                                },
                            };
                        }),
                    },
                }, include: {
                    schoolSubjects: true,
                }
            });
            return {
                status: 201,
                data: {
                    ...element,
                    schoolSubject: {
                        schoolSubjectUUID: element.schoolSubjects.schoolSubjectUUID,
                        schoolSubjectName: element.schoolSubjects.schoolSubjectName,
                        schoolSubjectAbbreviation: element.schoolSubjects.schoolSubjectAbbreviation,
                    }
                }
            };
        } catch {
            throw new InternalServerErrorException('Database error');
        }
    }

    async deleteTimeTableElement(
        timeTableElementUUID: string,
        request: Request,
    ): Promise<ReturnMessage> {
        try {
            const element = await prisma.timeTableElement.delete({
                where: {
                    timeTableElementUUID,
                },
            });
            return {
                status: 200,
                data: element,
            };
        } catch {
            throw new InternalServerErrorException('Database error');
        }
    }

    async getTimetable(
        classUUID: string,
        dateString: string,
        request,
    ): Promise<ReturnMessage> {
        const timeTableData = [];
        const weekday = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        const schoolDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

        try {
            const timeTable = await prisma.timeTableElement.findMany({
                where: {
                    timeTableElementClasses: {
                        some: {
                            schoolClasses: {
                                schoolClassUUID: classUUID,
                            },
                        },
                    },
                },
                include: {
                    schoolSubjects: true,
                    timeTableTeachers: {
                        include: {
                            users: true,
                        },
                    },
                    schoolRoom: true,
                    timeTableSubstitution: {

                        include: {
                            schoolRooms: true,
                            schoolSubjects: true,
                            timeTableSubstitutionClasses: {
                                include: {
                                    classes: true,
                                },
                            },
                            timeTableSubstitutionTeachers: {
                                include: {
                                    users: true,
                                },
                            },
                        },
                    },
                    timeTableElementClasses: {
                        include: {
                            schoolClasses: true,
                        },
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
                        },
                    },
                    timeTableOmitted: true,
                    timeTableExam: {
                        include: {
                            schoolRooms: true,
                        },
                    },
                },
            });

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
                                                lte: new Date(
                                                    new Date(dateString).setDate(
                                                        new Date(dateString).getDate() + 5,
                                                    ),
                                                ),
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });

            timeTable.forEach((element) => {
                const weekday = [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                ];

                timeTableData.push({
                    timeTableElementUUID: element.timeTableElementUUID,
                    timeTableElementStartTime: new Date(
                        new Date(dateString).setHours(
                            element.timeTableElementStartTime.getHours(),
                            element.timeTableElementStartTime.getMinutes(),
                            0, 0) + 86400000 * weekday.indexOf(element.timeTableElementDay),
                    ).toISOString(),
                    timeTableElementEndTime: new Date(
                        new Date(dateString).setHours(
                            element.timeTableElementEndTime.getHours(),
                            element.timeTableElementEndTime.getMinutes(),
                            0, 0) + 86400000 * weekday.indexOf(element.timeTableElementDay)).toISOString(),
                    timeTableElementDay: element.timeTableElementDay,
                    timeTableElementRoom: {
                        schoolRoomUUID: element.schoolRoom.schoolRoomUUID,
                        schoolRoomName: element.schoolRoom.schoolRoomName,
                        schoolRoomAbbreviation: element.schoolRoom.schoolRoomAbbreviation,
                        schoolRoomBuilding: element.schoolRoom.schoolRoomBuilding,
                    },
                    schoolSubject: {
                        schoolSubjectName: element.schoolSubjects.schoolSubjectName,
                        schoolSubjectAbbreviation:
                            element.schoolSubjects.schoolSubjectAbbreviation,
                    },
                    timeTableElementTeachers: element.timeTableTeachers.map((teacher) => {
                        return {
                            userUUID: teacher.users.userUUID,
                            userFirstname: teacher.users.userFirstname,
                            userLastname: teacher.users.userLastname,
                            userEmail: teacher.users.userEmail,
                        };
                    }),
                    timeTableElementClasses: element.timeTableElementClasses.map(
                        (classElement) => {
                            return {
                                schoolClassUUID: classElement.schoolClasses.schoolClassUUID,
                                schoolClassName: classElement.schoolClasses.schoolClassName,
                            };
                        },
                    ),
                    substitution: checkForSubstitution(element, new Date(dateString)),
                    event: checkForEvent(element, new Date(dateString)),
                    exam: checkForExam(element, new Date(dateString)),
                    omitted:
                        element.timeTableOmitted.length > 0 &&
                            element.timeTableOmitted[0].timeTableElementOmittedDate >=
                            new Date(dateString) &&
                            element.timeTableOmitted[0].timeTableElementOmittedDate <=
                            new Date(new Date(dateString).getTime() + 86400000 * 4)
                            ? {
                                timeTableOmittedReason:
                                    element.timeTableOmitted[0].timeTableElementOmittedReason,
                                timeTableOmittedDate:
                                    element.timeTableOmitted[0].timeTableElementOmittedDate,
                            }
                            : undefined,
                });
            });

            function checkForExam(element, monday) {
                if (element.timeTableExam.length > 0) {
                    if (
                        element.timeTableExam[0].timeTableExamDate >= monday &&
                        element.timeTableExam[0].timeTableExamDate <=
                        new Date(monday.getTime() + 86400000 * 4)
                    ) {
                        let day =
                            weekday[element.timeTableExam[0].timeTableExamDate.getDay()];
                        if (element.timeTableElementDay === day) {
                            return {
                                timeTableExamUUID: element.timeTableExam[0].timeTableExamUUID,
                                timeTableExamDate: element.timeTableExam[0].timeTableExamDate,
                                timeTableExamRoom:
                                    element.timeTableExam[0].schoolRooms.schoolRoomName,
                                timeTableExamDescription:
                                    element.timeTableExam[0].timeTableExamDescription,
                            };
                        }
                    }
                }
            }

            function checkForEvent(element, monday) {
                if (element.timeTableEvents.length > 0) {
                    if (
                        element.timeTableEvents[0].timeTableEventDate >= monday &&
                        element.timeTableEvents[0].timeTableEventDate <=
                        new Date(monday.setDate(monday.getDate() + 5))
                    ) {
                        let day =
                            weekday[element.timeTableEvents[0].timeTableEventDate.getDay()];
                        if (element.timeTableElementDay === day) {
                            return {
                                timeTableEventUUID:
                                    element.timeTableEvents[0].timeTableEventUUID,
                                timeTableEventName:
                                    element.timeTableEvents[0].timeTableEventName,
                                timeTableEventStartTime:
                                    element.timeTableEvents[0].timeTableEventStartTime,
                                timeTableEventEndTime:
                                    element.timeTableEvents[0].timeTableEventEndTime,
                                timeTableEventIsAllDay:
                                    element.timeTableEvents[0].timeTableEventIsAllDay,
                                timeTableEventTeachers:
                                    element.timeTableEvents[0].timeTableEventTeachers.map(
                                        (teacher) => {
                                            return {
                                                userUUID: teacher.users.userUUID,
                                                userFirstname: teacher.users.userFirstname,
                                                userLastname: teacher.users.userLastname,
                                                userEmail: teacher.users.userEmail,
                                            };
                                        },
                                    ),
                                timeTableEventClasses:
                                    element.timeTableEvents[0].timeTableEventClasses.map(
                                        (classs) => {
                                            return {
                                                schoolClassUUID: classs.classes.schoolClassUUID,
                                                schoolClassName: classs.classes.schoolClassName,
                                            };
                                        },
                                    ),
                            };
                        }
                    }
                }

                return undefined;
            }

            function checkForSubstitution(element, monday) {
                if (element.timeTableSubstitution.length > 0) {
                    if (
                        element.timeTableSubstitution[0].timeTableSubstitutionDate >= monday &&
                        element.timeTableSubstitution[0].timeTableSubstitutionDate <=
                        new Date(monday.getTime() + 86400000 * 4)
                    ) {
                        return {
                            timeTableSubstitutionUUID: element.timeTableSubstitution[0].timeTableSubstitutionUUID,
                            timeTableSubstitutionRoomUUID: element.timeTableSubstitution[0].schoolRooms.schoolRoomUUID,
                            timeTableSubstitutiontartTime: element.timeTableSubstitution[0].timeTableSubstitutionstartTime,
                            timeTableSubstitutionEndTime: element.timeTableSubstitution[0].timeTableSubstitutionEndTime,
                            timeTableSubstitutionSubject: {
                                schoolSubjectName: element.timeTableSubstitution[0].schoolSubjects.schoolSubjectName,
                                schoolSubjectUUID: element.timeTableSubstitution[0].schoolSubjects.schoolSubjectUUID,
                                schoolSubjectAbbreviation: element.timeTableSubstitution[0].schoolSubjects.schoolSubjectAbbreviation,
                            },
                            timeTableSubstitutionClasses: element.timeTableSubstitution[0].timeTableSubstitutionClasses.map(
                                (classes) => {
                                    return {
                                        schoolClassUUID: classes.classes.schoolClassUUID,
                                        schoolClassName: classes.classes.schoolClassName,
                                        schoolClassCreationTimestamp:
                                            classes.classes.schoolClassCreationTimestamp,
                                    };
                                },
                            ),
                            timeTableSubstitutionTeachers:
                                element.timeTableSubstitution[0].timeTableSubstitutionTeachers.map(
                                    (teacher) => {
                                        return {
                                            userUUID: teacher.users.userUUID,
                                            userFirstname: teacher.users.userFirstname,
                                            userLastname: teacher.users.userLastname,
                                            userEmail: teacher.users.userEmail,
                                        };
                                    },
                                ),
                            timeTableSubstitutionubjectName:
                                element.timeTableSubstitution
                                    .timeTableSubstitutionubjectName,
                        };
                    }
                }
                return undefined;
            }

            timeTableData.sort((a, b) => {
                return a.timeTableElementStartTime - b.timeTableElementStartTime;
            });

            const timeTableDays = timeTableData.reduce((r, a) => {
                r[a.timeTableElementDay] = [...(r[a.timeTableElementDay] || []), a];
                return r;
            }, {});

            let timeTableDaysArray = Object.keys(timeTableDays).map((key) => {
                return {
                    day: key,
                    timeTableElements: timeTableDays[key],
                };
            });

            timeTableDaysArray.forEach((element) => {
                const elementDate = new Date(dateString).setDate(
                    new Date(dateString).getDate() + schoolDays.indexOf(element.day),
                );
                holidays.departments.schools.holidays.forEach((holiday) => {
                    if (
                        new Date(elementDate) >= holiday.holidayStartDate &&
                        new Date(elementDate) <= holiday.holidayEndDate
                    ) {
                        element.timeTableElements.length = 0;
                        element.timeTableElements.push({
                            holidayUUID: holiday.holidayUUID,
                            holidayName: holiday.holidayName,
                        });
                    }
                });

                let allDayEvent = element.timeTableElements.find((element) => {
                    return (
                        element.event !== undefined &&
                        element.event.timeTableEventIsAllDay === true
                    );
                });

                if (allDayEvent !== undefined) {
                    element.timeTableElements.forEach((element) => {
                        element.event = allDayEvent.event;
                    });
                }
            });

            schoolDays.forEach((day) => {
                if (
                    timeTableDaysArray.find((element) => {
                        return element.day === day;
                    }) === undefined
                ) {
                    timeTableDaysArray.push({
                        day: day,
                        timeTableElements: [],
                    });
                }
            });

            timeTableDaysArray.sort((a, b) => {
                return weekday.indexOf(a.day) - weekday.indexOf(b.day);
            });

            return {
                status: RETURN_DATA.SUCCESS.status,
                data: timeTableDaysArray,
            };
        } catch {
            return RETURN_DATA.DATABASE_ERROR;
        }
    }

    async getTimeTableGrid(schoolUUID: string, request): Promise<ReturnMessage> {
        try {
            const timeTableGrid = await prisma.schools.findUnique({
                where: {
                    schoolUUID,
                },
                include: {
                    timeTableGrid: {
                        include: {
                            timeTableGridSpecialBreaks: {
                                include: {
                                    timeTableGridSpecialBreak: true,
                                },
                            },
                        },
                    },
                },
            });

            const timeTableGridData = {
                timeTableGridUUID:
                    timeTableGrid.timeTableGrid[0].timeTableGridBreakDuration,
                timeTableGridSpecialBreakStartTime:
                    timeTableGrid[0].timeTableGridSpecialBreakStartTime,
                timeTableGridMaxLessons: timeTableGrid[0].timeTableGridMaxLessons,
                timeTableGridBreakDuration:
                    timeTableGrid.timeTableGrid[0].timeTableGridBreakDuration,
                timeTableGridBreaks:
                    timeTableGrid.timeTableGrid[0].timeTableGridSpecialBreaks.map(
                        (element) => {
                            return {
                                timeTableGridSpecialBreakUUID:
                                    element.timeTableGridSpecialBreak
                                        .timeTableGridSpecialBreakUUID,
                                timeTableGridSpecialBreakDuration:
                                    element.timeTableGridSpecialBreak
                                        .timeTableGridSpecialBreakDuration,
                                timeTableGridSpecialBreakElement:
                                    element.timeTableGridSpecialBreak
                                        .timeTableGridSpecialBreakElement,
                            };
                        },
                    ),
            };

            return {
                status: RETURN_DATA.SUCCESS.status,
                data: timeTableGridData,
            };
        } catch {
            return RETURN_DATA.DATABASE_ERROR;
        }
    }

    async getTimeTableElement(
        timeTableElementUUID: string,
        request,
    ): Promise<ReturnMessage> {
        try {
            const element = await prisma.timeTableElement.findUnique({
                where: {
                    timeTableElementUUID,
                },
                include: {
                    schoolRoom: true,
                    timeTableSubstitution: {
                        include: {
                            schoolSubjects: true,
                            schoolRooms: true,
                            timeTableSubstitutionClasses: {
                                include: {
                                    classes: true,
                                }
                            },
                            timeTableSubstitutionTeachers: {
                                include: {
                                    users: true,
                                }
                            }
                        },
                    },
                    schoolSubjects: true,
                    timeTableTeachers: {
                        include: {
                            users: true,
                        },
                    },
                    timeTableElementClasses: {
                        include: {
                            schoolClasses: true,
                        },
                    },
                },
            });

            const timeTableElementStartTime = new Date(
                new Date().setHours(
                    new Date(element.timeTableElementStartTime).getHours(),
                    new Date(element.timeTableElementStartTime).getMinutes(),
                ),
            );

            const timeTableElementEndTime = new Date(
                new Date().setHours(
                    new Date(element.timeTableElementEndTime).getHours(),
                    new Date(element.timeTableElementEndTime).getMinutes(),
                ),
            );

            const timeTableElementData = {
                timeTableElementUUID: element.timeTableElementUUID,
                timeTableElementStartTime,
                timeTableElementEndTime,
                timeTableElementDay: element.timeTableElementDay,
                timeTableElementRoomUUID: element.schoolRoom.schoolRoomUUID,
                schoolSubject: {
                    schoolSubjectUUID: element.schoolSubjects.schoolSubjectUUID,
                    schoolSubjectName: element.schoolSubjects.schoolSubjectName,
                    schoolSubjectAbbreviation:
                        element.schoolSubjects.schoolSubjectAbbreviation,
                },
                // substitution: element.timeTableSubstitution ? {
                //   timeTableSubstitutionUUID: element.timeTableSubstitution.timeTableSubstitutionUUID,
                //   timeTableSubstitutionRoomUUID: element.timeTableSubstitution.schoolRooms.schoolRoomUUID,
                //   timeTableSubstitutiontartTime: element.timeTableElementStartTime,
                //   timeTableSubstitutionEndTime: element.timeTableElementEndTime,
                //   schoolSubject: {
                //     schoolSubjectName: element.timeTableSubstitution.schoolSubjects.schoolSubjectName,
                //     schoolSubjectUUID: element.timeTableSubstitution.schoolSubjects.schoolSubjectUUID,
                //     schoolSubjectAbbreviation: element.timeTableSubstitution.schoolSubjects.schoolSubjectAbbreviation,
                //   },
                //   timeTableSubstitutionClasses: element.timeTableSubstitution.timeTableSubstitutionClasses.map((classes) => classes.classes.schoolClassUUID),
                //   timeTableSubstitutionTeachers:
                //     element.timeTableSubstitution.timeTableSubstitutionTeachers.map(
                //       (teacher) => teacher.users.userUUID,
                //     ),
                // } : undefined,
                timeTableElementTeachers: element.timeTableTeachers.map(
                    (teacher) => teacher.users.userUUID,
                ),
                timeTableElementClasses: element.timeTableElementClasses.map(
                    (classes) => classes.schoolClasses.schoolClassUUID,
                ),
            };

            return {
                status: RETURN_DATA.SUCCESS.status,
                data: timeTableElementData,
            };
        } catch {
            return RETURN_DATA.DATABASE_ERROR;
        }
    }

    async getTimeTableElementDetailed(timeTableElementUUID: string, date: string, request): Promise<ReturnMessage> {
        const sunday = new Date(new Date(date).setDate(new Date(date).getDate() + 6));
        const monday = new Date(date);

        const element = await prisma.timeTableElement.findUnique({
            where: {
                timeTableElementUUID,
            },
            include: {
                schoolRoom: true,
                schoolSubjects: true,
                timeTableTeachers: {
                    include: {
                        users: true,
                    }
                },
                timeTableElementClasses: {
                    include: {
                        schoolClasses: true,
                    }
                },
                timeTableExam: {
                    where: {
                        timeTableExamDate: {
                            gte: monday,
                            lte: sunday,
                        }
                    },
                    include: {
                        schoolRooms: true,
                    }
                },
                timeTableOmitted: {
                    where: {
                        timeTableElementOmittedDate: {
                            gte: monday,
                            lte: sunday,
                        }
                    }
                },
                timeTableSubstitution: {
                    where: {
                        timeTableSubstitutionDate: {
                            gte: monday,
                            lte: sunday,
                        },
                    },
                    include: {
                        timeTableSubstitutionClasses: {
                            include: {
                                classes: true,
                            }
                        },
                        timeTableSubstitutionTeachers: {
                            include: {
                                users: true,
                            }
                        },
                        schoolRooms: true,
                        schoolSubjects: true,

                    },
                }
            },
        })

        const timeTableElementData = {
            timeTableElementUUID: element.timeTableElementUUID,
            timeTableElementStartTime: element.timeTableElementStartTime,
            timeTableElementEndTime: element.timeTableElementEndTime,
            timeTableElementDay: element.timeTableElementDay,
            timeTableElementRoomUUID: element.schoolRoom.schoolRoomUUID,
            schoolSubject: {
                schoolSubjectUUID: element.schoolSubjects.schoolSubjectUUID,
                schoolSubjectName: element.schoolSubjects.schoolSubjectName,
                schoolSubjectAbbreviation: element.schoolSubjects.schoolSubjectAbbreviation,
            },
            substitution: element.timeTableSubstitution.length > 0 ? {
                timeTableSubstitutionUUID: element.timeTableSubstitution[0].timeTableSubstitutionUUID,
                timeTableSubstitutionRoomUUID: element.timeTableSubstitution[0].schoolRooms.schoolRoomUUID,
                timeTableSubstitutiontartTime: element.timeTableElementStartTime,
                timeTableSubstitutionEndTime: element.timeTableElementEndTime,
                schoolSubject: {
                    schoolSubjectName: element.timeTableSubstitution[0].schoolSubjects.schoolSubjectName,
                    schoolSubjectUUID: element.timeTableSubstitution[0].schoolSubjects.schoolSubjectUUID,
                    schoolSubjectAbbreviation: element.timeTableSubstitution[0].schoolSubjects.schoolSubjectAbbreviation,
                },
                timeTableSubstitutionClasses: element.timeTableSubstitution[0].timeTableSubstitutionClasses.map((classes) => classes.classes.schoolClassUUID),
                timeTableSubstitutionTeachers:
                    element.timeTableSubstitution[0].timeTableSubstitutionTeachers.map(
                        (teacher) => teacher.users.userUUID,
                    ),
            } : undefined,
            omitted: element.timeTableOmitted.length > 0 ? {
                timeTableElementOmittedDate: element.timeTableOmitted[0].timeTableElementOmittedDate,
                timeTableElementOmittedReason: element.timeTableOmitted[0].timeTableElementOmittedReason,
            } : undefined,
            exam: element.timeTableExam.length > 0 ? {
                timeTableExamDate: element.timeTableExam[0].timeTableExamDate,
                timeTableExamDescription: element.timeTableExam[0].timeTableExamDescription,
                timeTableExamRoom: element.timeTableExam[0].schoolRooms.schoolRoomUUID,
            } : undefined,
            timeTableElementTeachers: element.timeTableTeachers.map(teacher => teacher.users.userUUID),
            timeTableElementClasses: element.timeTableElementClasses.map(classes => classes.schoolClasses.schoolClassUUID),
        }

        return {
            status: RETURN_DATA.SUCCESS.status,
            data: timeTableElementData,
        }
    }

    async addTimeTableGrid(body: any, request): Promise<ReturnMessage> {
        const {
            schoolUUID,
            timeTableGridMaxLessons,
            timeTableGridElementDuration,
            timeTableGridBreakDuration,
            timeTableGridStartTime,
            timeTableGridSpecialBreaks,
        } = body;

        try {
            const timeTableGrid = await prisma.timeTableGrid.create({
                data: {
                    timeTableGridStartTime: new Date(timeTableGridStartTime),
                    timeTableGridElementDuration,
                    timeTableGridMaxLessons,
                    timeTableGridBreakDuration,
                    schools: {
                        connect: {
                            schoolUUID,
                        },
                    },
                    timeTableGridSpecialBreaks: {
                        createMany: {
                            data: timeTableGridSpecialBreaks.map((element) => {
                                return {
                                    timeTableGridSpecialBreak: {
                                        create: {
                                            timeTableGridSpecialBreakUUID: `${ID_STARTERS.BREAK
                                                }${uuidv4()}`,
                                            timeTableGridSpecialBreakDuration:
                                                element.timeTableGridSpecialBreakDuration,
                                            timeTableGridSpecialBreakElement:
                                                element.timeTableGridSpecialBreakElement,
                                        },
                                    },
                                };
                            }),
                        },
                    },
                },
            });

            return {
                status: 200,
                data: timeTableGrid,
            };
        } catch {
            return RETURN_DATA.DATABASE_ERROR;
        }
    }

    async editTimeTableGrid(body: any, request: Request): Promise<ReturnMessage> {
        const {
            schoolUUID,
            timeTableGridMaxLessons,
            timeTableGridElementDuration,
            timeTableGridBreakDuration,
            timeTableGridStartTime,
        } = body;

        try {
            const school = await prisma.schools.findUnique({
                where: {
                    schoolUUID,
                },
            });

            const timeTableGrid = await prisma.timeTableGrid.update({
                where: {
                    schoolId: school.schoolId,
                },
                data: {
                    timeTableGridStartTime: new Date(timeTableGridStartTime),
                    timeTableGridElementDuration,
                    timeTableGridMaxLessons,
                    timeTableGridBreakDuration,
                },
            });

            return {
                status: 200,
                data: timeTableGrid,
            };
        } catch {
            return RETURN_DATA.DATABASE_ERROR;
        }
    }

    async removeBreak(payload: any, request: Request): Promise<ReturnMessage> {
        const { timeTableGridSpecialBreakUUID } = payload;

        try {
            await prisma.timeTableGridSpecialBreak.delete({
                where: {
                    timeTableGridSpecialBreakUUID,
                },
            });
            return {
                status: 200,
                data: null,
            };
        } catch {
            throw new InternalServerErrorException('Database error');
        }
    }

    async updateBreak(payload: any, request: Request): Promise<ReturnMessage> {
        const {
            timeTableGridSpecialBreakUUID,
            timeTableGridSpecialBreakDuration,
            timeTableGridSpecialBreakElement,
        } = payload;

        try {
            const breakElement = await prisma.timeTableGridSpecialBreak.update({
                where: {
                    timeTableGridSpecialBreakUUID,
                },
                data: {
                    timeTableGridSpecialBreakDuration,
                    timeTableGridSpecialBreakElement,
                },
            });
            return {
                status: 200,
                data: breakElement,
            };
        } catch {
            throw new InternalServerErrorException('Database error');
        }
    }

    async addBreak(payload: any, request: Request): Promise<ReturnMessage> {
        const {
            schoolUUID,
            timeTableGridSpecialBreakDuration,
            timeTableGridSpecialBreakElement,
        } = payload;

        try {
            const school = await prisma.schools.findUnique({
                where: {
                    schoolUUID,
                },
            });

            const breakElement = await prisma.timeTableGridSpecialBreaks.create({
                data: {
                    timeTableGrid: {
                        connect: {
                            schoolId: school.schoolId,
                        },
                    },
                    timeTableGridSpecialBreak: {
                        create: {
                            timeTableGridSpecialBreakUUID: `${ID_STARTERS.BREAK}${uuidv4()}`,
                            timeTableGridSpecialBreakDuration,
                            timeTableGridSpecialBreakElement,
                        },
                    },
                },
            });
            return {
                status: 200,
                data: breakElement,
            };
        } catch {
            throw new InternalServerErrorException('Database error');
        }
    }

    async getFreeRooms(): Promise<ReturnMessage> {
        const rooms = await prisma.schoolRooms.findMany({
            where: {
                timeTableElement: {
                    every: {
                        timeTableElementEndTime: {
                            lt: new Date(),
                        },
                    },
                },
            },
        });


        return {
            status: 200,
            data: null,
        };
    }

    async deleteTimeTableGrid(
        schoolUUID: string,
        request,
    ): Promise<ReturnMessage> {
        try {
            const school = await prisma.schools.findUnique({
                where: {
                    schoolUUID,
                },
            });

            const timeTableGrid = await prisma.timeTableGrid.delete({
                where: {
                    schoolId: school.schoolId,
                },
            });

            return {
                status: 200,
            };
        } catch {
            return RETURN_DATA.DATABASE_ERROR;
        }
    }

    async addHoliday(holiday, request): Promise<ReturnMessage> {
        const { schoolUUID, holidayName, holidayStartDate, holidayEndDate } =
            holiday;

        if (holidayStartDate > holidayEndDate) return RETURN_DATA.INVALID_INPUT;

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
                },
            });
            return {
                status: RETURN_DATA.SUCCESS.status,
                data: {
                    holidayUUID: holiday.holidayUUID,
                    holidayName: holiday.holidayName,
                    holidayStartDate: holiday.holidayStartDate,
                    holidayEndDate: holiday.holidayEndDate,
                },
            };
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
                },
            });

            return {
                status: RETURN_DATA.SUCCESS.status,
                data: holidays.holidays.map((holiday) => {
                    return {
                        holidayUUID: holiday.holidayUUID,
                        holidayName: holiday.holidayName,
                        holidayStartDate: holiday.holidayStartDate,
                        holidayEndDate: holiday.holidayEndDate,
                    };
                }),
            };
        } catch {
            return RETURN_DATA.DATABASE_ERROR;
        }
    }

    async removeHoliday(holidayUUID: string): Promise<ReturnMessage> {
        try {
            const holiday = await prisma.holidays.delete({
                where: {
                    holidayUUID,
                },
            });
            return {
                status: RETURN_DATA.SUCCESS.status,
                data: holiday,
            };
        } catch {
            return RETURN_DATA.DATABASE_ERROR;
        }
    }

    async updateHoliday(
        holidayUUID: string,
        holiday: any,
    ): Promise<ReturnMessage> {
        const { holidayName, holidayStartDate, holidayEndDate } = holiday;

        if (holidayStartDate > holidayEndDate) return RETURN_DATA.INVALID_INPUT;

        try {
            const updatedHoliday = await prisma.holidays.update({
                where: {
                    holidayUUID,
                },
                data: {
                    holidayName,
                    holidayStartDate: new Date(holidayStartDate),
                    holidayEndDate: new Date(holidayEndDate),
                },
            });
            return {
                status: RETURN_DATA.SUCCESS.status,
                data: {
                    holidayUUID: updatedHoliday.holidayUUID,
                    holidayName: updatedHoliday.holidayName,
                    holidayStartDate: updatedHoliday.holidayStartDate,
                    holidayEndDate: updatedHoliday.holidayEndDate,
                },
            };
        } catch {
            return RETURN_DATA.DATABASE_ERROR;
        }
    }

    async addOmit(payload: any, request): Promise<ReturnMessage> {
        const {
            timeTableElementUUID,
            timeTableElementOmittedReason,
            timeTableElementOmittedDate,
        } = payload;

        try {
            const omit = await prisma.timeTableOmitted.create({
                data: {
                    timeTableElementIsOmitted: true,
                    timeTableElementOmittedReason,
                    timeTableElementOmittedDate: new Date(timeTableElementOmittedDate),
                    timeTableElement: {
                        connect: {
                            timeTableElementUUID,
                        },
                    },
                },
            });

            return {
                status: RETURN_DATA.SUCCESS.status,
                data: omit,
            };
        } catch {
            throw new InternalServerErrorException('Database error');
        }
    }

    async removeOmit(
        timeTableElementUUID: string,
        request,
    ): Promise<ReturnMessage> {
        try {
            const omit = await prisma.timeTableOmitted.deleteMany({
                where: {
                    timeTableElement: {
                        timeTableElementUUID,
                    },
                },
            });

            return {
                status: RETURN_DATA.SUCCESS.status,
                data: omit,
            };
        } catch {
            throw new InternalServerErrorException('Database error');
        }
    }

    async addSubstitution(substitutions: any, request): Promise<ReturnMessage> {
        const jwt = await this.helper.extractJWTToken(request);
        const userUUID = await this.helper.getUserUUIDfromJWT(jwt);
        const {
            timeTableElementUUID,
            timeTableSubstitutionUUID,
            timeTableSubstitutionDate,
            timeTableSubstitutionRoomUUID,
            schoolSubject,
            timeTableSubstitutionTeachers,
            timeTableSubstitutionClasses,
        } = substitutions;

        let deleted;

        if (timeTableSubstitutionUUID) {
            deleted = await prisma.timeTableSubstitutions.delete({
                where: {
                    timeTableSubstitutionUUID
                },
            });
        }

        try {

            const timeTableElement = await prisma.timeTableSubstitutions.create({
                data: {
                    timeTableSubstitutionUUID: deleted && deleted.timeTableSubstitutionUUID ? deleted.timeTableSubstitutionUUID : `${ID_STARTERS.SUBSTITUTION}${uuidv4()}`,
                    timeTableSubstitutionDate: new Date(timeTableSubstitutionDate),
                    schoolRooms: {
                        connect: {
                            schoolRoomUUID: timeTableSubstitutionRoomUUID,
                        }
                    },
                    schoolSubjects: {
                        connect: {
                            schoolSubjectUUID: schoolSubject.schoolSubjectUUID,
                        }
                    },
                    users: {
                        connect: {
                            userUUID,
                        }
                    },
                    timeTableElements: {
                        connect: {
                            timeTableElementUUID,
                        }
                    },
                    timeTableSubstitutionClasses: {
                        create: timeTableSubstitutionClasses.map((timeTableSubstitutionClass) => {
                            return {
                                classes: {
                                    connect: {
                                        schoolClassUUID: timeTableSubstitutionClass,
                                    }
                                }
                            }
                        })
                    },
                    timeTableSubstitutionTeachers: {
                        create: timeTableSubstitutionTeachers.map((timeTableSubstitutionTeacher) => {
                            return {
                                users: {
                                    connect: {
                                        userUUID: timeTableSubstitutionTeacher,
                                    }
                                }
                            }
                        })
                    },
                },
                include: {
                    schoolSubjects: true,
                    timeTableElements: true,
                }
            });
            return {
                status: RETURN_DATA.SUCCESS.status,
                data: {
                    ...timeTableElement,
                    timeTableElementUUID:
                        timeTableElement.timeTableElements.timeTableElementUUID,
                    schoolSubject: {
                        schoolSubjectUUID: timeTableElement.schoolSubjects.schoolSubjectUUID,
                        schoolSubjectName: timeTableElement.schoolSubjects.schoolSubjectName,
                        schoolSubjectAbbreviation: timeTableElement.schoolSubjects.schoolSubjectAbbreviation,
                    },
                },
            };
        } catch {
            return RETURN_DATA.DATABASE_ERROR;
        }
    }

    async deleteSubstitution(
        timeTableSubstitutionUUID: string,
        request,
    ): Promise<ReturnMessage> {
        try {
            const substitution = await prisma.timeTableSubstitutions.delete({
                where: {
                    timeTableSubstitutionUUID,
                },
            });

            return {
                status: 200,
                data: substitution,
            };
        } catch {
            return RETURN_DATA.DATABASE_ERROR;
        }
    }

    async updateSubstitution(substitution: any, request): Promise<ReturnMessage> {
        const {
            timeTableSubstitutionUUID,
            timeTableElementUUID,
            timeTableSubstitutionDate,
            timeTableSubstitutionTeachers,
            schoolRoomUUID,
            schoolSubject,
            schoolClasses,
        } = substitution;

        try {
            const updatedSubstitution = await prisma.timeTableSubstitutions.update({
                where: {
                    timeTableSubstitutionUUID,
                },
                data: {
                    timeTableSubstitutionDate,
                    timeTableElements: {
                        connect: {
                            timeTableElementUUID,
                        },
                    },
                    schoolRooms: {
                        connect: {
                            schoolRoomUUID,
                        },
                    },
                    schoolSubjects: {
                        connect: {
                            schoolSubjectUUID: schoolSubject,
                        },
                    },
                    timeTableSubstitutionClasses: {
                        create: schoolClasses.map((subject) => {
                            return {
                                schoolClasses: {
                                    connect: {
                                        schoolSubjectUUID: subject,
                                    },
                                },
                            };
                        }),
                    },
                },
            });

            if (timeTableSubstitutionTeachers.length > 0) {
                await prisma.timeTableSubstitutionTeachers.createMany({
                    data: timeTableSubstitutionTeachers.map((teacher) => {
                        return {
                            timeTableSubstitutionUUID:
                                updatedSubstitution.timeTableSubstitutionUUID,
                            users: {
                                connect: {
                                    userUUID: teacher,
                                },
                            },
                        };
                    }),
                });
            }

            return {
                status: RETURN_DATA.SUCCESS.status,
                data: updatedSubstitution,
            };
        } catch {
            return RETURN_DATA.DATABASE_ERROR;
        }
    }

    async getSubstitutionForTimeTableElement(
        timeTableElementUUID: string,
        date: string,
        request,
    ): Promise<ReturnMessage> {
        try {
            const timeTableElement = await prisma.timeTableElement.findUnique({
                where: {
                    timeTableElementUUID,
                },
                include: {
                    schoolSubjects: true,
                    timeTableElementClasses: {
                        include: {
                            schoolClasses: true,
                        }
                    },
                    timeTableTeachers: {
                        include: {
                            users: true,
                        },
                    },
                    schoolRoom: true,
                    timeTableSubstitution: {
                        where: {
                            timeTableSubstitutionDate: {
                                gte: new Date(date),
                                lte: new Date(
                                    new Date(date).setDate(new Date(date).getDate() + 5)),
                            }
                        },
                        include: {
                            schoolSubjects: true,
                            schoolRooms: true,
                            timeTableSubstitutionTeachers: {
                                include: {
                                    users: true,
                                }
                            },
                            timeTableSubstitutionClasses: {
                                include: {
                                    classes: true,
                                }
                            },
                        }
                    }
                }

            });
            if (timeTableElement.timeTableSubstitution.length > 0) {
                return {
                    status: 200,
                    data: {
                        ...timeTableElement.timeTableSubstitution[0],
                        timeTableSubstitutionUUID: timeTableElement.timeTableSubstitution[0].timeTableSubstitutionUUID,
                        timeTableSubstitutionClasses: timeTableElement.timeTableSubstitution[0].timeTableSubstitutionClasses.map((timeTableSubstitutionClass) => timeTableSubstitutionClass.classes.schoolClassUUID),
                        timeTableSubstitutionTeachers: timeTableElement.timeTableSubstitution[0].timeTableSubstitutionTeachers.map((timeTableSubstitutionTeacher) => timeTableSubstitutionTeacher.users.userUUID),
                        timeTableSubstitutionRoomUUID: timeTableElement.timeTableSubstitution[0].schoolRooms.schoolRoomUUID,
                        schoolSubject: {
                            schoolSubjectUUID: timeTableElement.timeTableSubstitution[0].schoolSubjects.schoolSubjectUUID,
                            schoolSubjectName: timeTableElement.timeTableSubstitution[0].schoolSubjects.schoolSubjectName,
                            schoolSubjectAbbreviation: timeTableElement.timeTableSubstitution[0].schoolSubjects.schoolSubjectAbbreviation,
                        },
                        timeTableElementUUID: timeTableElement.timeTableElementUUID,
                    }
                }
            } else {
                return {
                    status: 200,
                    data: {
                        ...timeTableElement.timeTableSubstitution,
                        timeTableSubstitutionUUID: "",
                        timeTableSubstitutionClasses: timeTableElement.timeTableElementClasses.map((schoolClass) => schoolClass.schoolClasses.schoolClassUUID),
                        timeTableSubstitutionTeachers: timeTableElement.timeTableTeachers.map((teacher) => teacher.users.userUUID),
                        timeTableSubstitutionRoomUUID: timeTableElement.schoolRoom.schoolRoomUUID,
                        schoolSubject: {
                            schoolSubjectUUID: timeTableElement.schoolSubjects.schoolSubjectUUID,
                            schoolSubjectName: timeTableElement.schoolSubjects.schoolSubjectName,
                            schoolSubjectAbbreviation: timeTableElement.schoolSubjects.schoolSubjectAbbreviation,
                        },
                        timeTableElementUUID: timeTableElement.timeTableElementUUID,
                    }
                }
            }
        } catch {
            return RETURN_DATA.DATABASE_ERROR;
        }
    }

    async addExam(payload: AddExamDTO, request: Request): Promise<Exam> {
        const {
            timeTableElementUUID,
            timeTableExamDate,
            timeTableExamDescription,
            timeTableExamRoom,
        } = payload;

        try {
            const exam = await prisma.timeTableExam.create({
                data: {
                    timeTableExamUUID: `${ID_STARTERS.EXAM}${uuidv4()}`,
                    schoolRooms: {
                        connect: {
                            schoolRoomUUID: timeTableExamRoom.schoolRoomUUID,
                        },
                    },
                    timeTableExamDescription,
                    timeTableExamDate: new Date(timeTableExamDate),
                    timeTableElements: {
                        connect: {
                            timeTableElementUUID,
                        },
                    },
                },
            });
            return new Exam(exam);
        } catch {
            throw new InternalServerErrorException('Database error');
        }
    }

    async updateExam(payload: UpdateExamDTO, request: Request): Promise<Exam> {
        const {
            timeTableExamUUID,
            timeTableExamDate,
            timeTableExamDescription,
            timeTableExamRoom,
        } = payload;

        try {
            const exam = await prisma.timeTableExam.update({
                where: {
                    timeTableExamUUID,
                },
                data: {
                    timeTableExamDescription,
                    timeTableExamDate: new Date(timeTableExamDate),
                    schoolRooms: {
                        connect: {
                            schoolRoomUUID: timeTableExamRoom.schoolRoomUUID,
                        },
                    },
                },
            });
            return new Exam(exam);
        } catch (err) {
            throw new InternalServerErrorException('Database error');
        }
    }

    async deleteExam(examUUID: string, request: Request): Promise<Exam> {
        try {
            const exam = await prisma.timeTableExam.delete({
                where: {
                    timeTableExamUUID: examUUID,
                },
            });
            return new Exam(exam);
        } catch (err) {
            throw new InternalServerErrorException('Database error');
        }
    }

    async getExam(examUUID: string, request: Request): Promise<Exam> {
        try {
            const exam = await prisma.timeTableExam.findUnique({
                where: {
                    timeTableExamUUID: examUUID,
                },
            });
            return new Exam(exam);
        } catch {
            throw new InternalServerErrorException('Database error');
        }
    }
    async getExamsOfSchool(
        schoolUUID: string,
        request: Request,
    ): Promise<Exam[]> {
        try {
            const exams = await prisma.timeTableExam.findMany({
                where: {
                    timeTableElements: {
                        schoolSubjects: {
                            school: {
                                schoolUUID,
                            },
                        },
                    },
                },
                include: {
                    schoolRooms: true,
                    timeTableElements: {
                        include: {
                            timeTableElementClasses: {
                                include: {
                                    schoolClasses: true,
                                }
                            }
                        }
                    }
                },
            });
            return exams.map(
                (exam) =>
                    new Exam({
                        ...exam,
                        timeTableExamUUID: exam.timeTableExamUUID,
                        timeTableElementUUID: exam.timeTableElements.timeTableElementUUID,
                        timeTableElementDay: exam.timeTableElements.timeTableElementDay,
                        timeTableExamSchoolClasses: exam.timeTableElements.timeTableElementClasses.map((schoolClass) => schoolClass.schoolClasses.schoolClassUUID),
                        timeTableExamRoom: new SchoolRoom(exam.schoolRooms),
                    }),
            );
        } catch {
            throw new InternalServerErrorException('Database error');
        }
    }

    async getExamsOfUser(request: Request): Promise<Exam[] | Exam> {
        const jwt = await this.helper.extractJWTToken(request);
        const userUUID = await this.helper.getUserUUIDfromJWT(jwt);

        try {
            const exams = await prisma.timeTableElementClasses.findMany({
                where: {},
            });
            return exams.map((exam) => new Exam(exam));
        } catch {
            throw new InternalServerErrorException('Database error');
        }
    }
}
