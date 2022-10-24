import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { AddExamDTO, Exam, UpdateExamDTO } from 'src/entity/exam/exam';
import { Holiday, UpdateHolidayDTO } from 'src/entity/holiday/holiday';
import { TimeTableElement } from 'src/entity/time-table-element/timeTableElement';
import { TimeTableGrid } from 'src/entity/time-table-grid/time-table-grid';
import { HelperService } from 'src/helper/helper.service';
import { ID_STARTERS, RETURN_DATA } from 'src/misc/parameterConstants';
import { ReturnMessage } from 'src/types/Database';
import { v4 as uuidv4 } from 'uuid';

require('dotenv').config();
const prisma = new PrismaClient();

@Injectable()
export class TimetableService {
    constructor(private readonly helper: HelperService) { }

    async createTimetable(payload: any, request): Promise<ReturnMessage> {
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
                        timeTableTeachers: {
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
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        const schoolDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

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
                                                lte: new Date(new Date(dateString).setDate(new Date(dateString).getDate() + 5)),
                                            }
                                        }
                                    },
                                }
                            }
                        }
                    }
                }
            })

            timeTable.forEach((element) => {
                const weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

                timeTableData.push({
                    timeTableElementUUID: element.timeTableElementUUID,
                    timeTableElementStartTime: new Date(new Date(dateString).setHours(element.timeTableElementStartTime.getHours(), element.timeTableElementStartTime.getMinutes(), 0, 0) + 86400000 * weekday.indexOf(element.timeTableElementDay)).toISOString(),
                    timeTableElementEndTime: new Date(new Date(dateString).setHours(element.timeTableElementEndTime.getHours(), element.timeTableElementEndTime.getMinutes(), 0, 0) + 86400000 * weekday.indexOf(element.timeTableElementDay)).toISOString(),
                    timeTableElementDay: element.timeTableElementDay,
                    timeTableElementRoom: {
                        schoolRoomUUID: element.schoolRoom.schoolRoomUUID,
                        schoolRoomName: element.schoolRoom.schoolRoomName,
                        schoolRoomAbbreviation: element.schoolRoom.schoolRoomAbbreviation,
                        schoolRoomBuilding: element.schoolRoom.schoolRoomBuilding,
                    },
                    schoolSubject: {
                        schoolSubjectName: element.schoolSubjects.schoolSubjectName,
                        schoolSubjectAbbreviation: element.schoolSubjects.schoolSubjectAbbreviation,
                    },
                    timeTableElementTeachers: element.timeTableTeachers.map((teacher) => {
                        return {
                            userUUID: teacher.users.userUUID,
                            userFirstname: teacher.users.userFirstname,
                            userLastname: teacher.users.userLastname,
                            userEmail: teacher.users.userEmail,
                        }
                    }),
                    timeTableElementClasses: element.timeTableElementClasses.map((classElement) => {
                        return {
                            schoolClassUUID: classElement.schoolClasses.schoolClassUUID,
                            schoolClassName: classElement.schoolClasses.schoolClassName,
                        }
                    }),
                    substitution: checkForSubstitution(element, new Date(dateString)),
                    event: checkForEvent(element, new Date(dateString)),
                    exam: checkForExam(element, new Date(dateString)),
                    omitted: element.timeTableOmitted.length > 0 ? {
                        timeTableOmittedReason: element.timeTableOmitted[0].timeTableElementOmittedReason,
                        timeTableOmittedDate: element.timeTableOmitted[0].timeTableElementOmittedDate,
                    } : undefined,
                })
            })

            function checkForExam(element, monday) {
                if (element.timeTableExam.length > 0) {
                    if (element.timeTableExam[0].timeTableExamDate >= monday && element.timeTableExam[0].timeTableExamDate <= new Date(monday.getTime() + 86400000 * 4)) {
                        let day = weekday[element.timeTableExam[0].timeTableExamDate.getDay()]
                        if (element.timeTableElementDay === day) {
                            return {
                                timeTableExamUUID: element.timeTableExam[0].timeTableExamUUID,
                                timeTableExamDate: element.timeTableExam[0].timeTableExamDate,
                                timeTableExamRoom: element.timeTableExam[0].schoolRooms.schoolRoomName,
                                timeTableExamDescription: element.timeTableExam[0].timeTableExamDescription,
                            }
                        }
                    }
                }
            }

            function checkForEvent(element, monday) {
                if (element.timeTableEvents.length > 0) {
                    if (element.timeTableEvents[0].timeTableEventDate >= monday && element.timeTableEvents[0].timeTableEventDate <= new Date(monday.setDate(monday.getDate() + 5))) {
                        let day = weekday[element.timeTableEvents[0].timeTableEventDate.getDay()]
                        if (element.timeTableElementDay === day) {
                            return {
                                timeTableEventUUID: element.timeTableEvents[0].timeTableEventUUID,
                                timeTableEventName: element.timeTableEvents[0].timeTableEventName,
                                timeTableEventStartTime: element.timeTableEvents[0].timeTableEventStartTime,
                                timeTableEventEndTime: element.timeTableEvents[0].timeTableEventEndTime,
                                timeTableEventIsAllDay: element.timeTableEvents[0].timeTableEventIsAllDay,
                                timeTableEventTeachers: element.timeTableEvents[0].timeTableEventTeachers.map((teacher) => {
                                    return {
                                        userUUID: teacher.users.userUUID,
                                        userFirstname: teacher.users.userFirstname,
                                        userLastname: teacher.users.userLastname,
                                        userEmail: teacher.users.userEmail,
                                    }
                                }
                                ),
                                timeTableEventClasses: element.timeTableEvents[0].timeTableEventClasses.map((classs) => {
                                    return {
                                        schoolClassUUID: classs.classes.schoolClassUUID,
                                        schoolClassName: classs.classes.schoolClassName,
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
                                        userEmail: teacher.users.userEmail,
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
            })

            timeTableDaysArray.forEach((element) => {
                const elementDate = new Date(dateString).setDate(new Date(dateString).getDate() + schoolDays.indexOf(element.day))
                holidays.departments.schools.holidays.forEach((holiday) => {
                    if (new Date(elementDate) >= holiday.holidayStartDate && new Date(elementDate) <= holiday.holidayEndDate) {
                        element.timeTableElements.length = 0
                        element.timeTableElements.push({
                            holidayUUID: holiday.holidayUUID,
                            holidayName: holiday.holidayName,
                        })
                    }
                })

                let allDayEvent = element.timeTableElements.find((element) => {
                    return element.event !== undefined && element.event.timeTableEventIsAllDay === true
                })

                if (allDayEvent !== undefined) {
                    element.timeTableElements.forEach((element) => {
                        element.event = allDayEvent.event
                    })
                }
            })

            schoolDays.forEach((day) => {
                if (timeTableDaysArray.find((element) => {
                    return element.day === day
                }) === undefined) {
                    timeTableDaysArray.push({
                        day: day,
                        timeTableElements: []
                    })
                }
            })

            timeTableDaysArray.sort((a, b) => {
                return weekday.indexOf(a.day) - weekday.indexOf(b.day)
            })

            return {
                status: 200,
                data: timeTableDaysArray,
            }
        } catch {
            return RETURN_DATA.DATABASE_ERROR;
        }
    }

    async getTimeTableGrid(schoolUUID: string, request: Request): Promise<ReturnMessage> {
        try {
            const timeTableGrid = await prisma.schools.findUnique({
                where: {
                    schoolUUID,
                },
                include: {
                    timeTableGrid: {
                        include: {
                            timeTableGridSpecialBreak: true,
                        }
                    }
                }
            })

            const timeTableGridData = {
                timeTableGridUUID: timeTableGrid.timeTableGrid[0].timeTableGridBreakDuration,
                timeTableGridSpecialBreakStartTime: timeTableGrid[0].timeTableGridSpecialBreakStartTime,
                timeTableGridMaxLessons: timeTableGrid[0].timeTableGridMaxLessons,
                timeTableGridBreakDuration: timeTableGrid.timeTableGrid[0].timeTableGridBreakDuration,
                timeTableGridSpecialBreak: {
                    timeTableGridSpecialBreakUUID: timeTableGrid.timeTableGrid[0].timeTableGridSpecialBreak[0].timeTableGridSpecialBreakUUID,
                    timeTableGridSpecialBreakElement: timeTableGrid.timeTableGrid[0].timeTableGridSpecialBreak[0].timeTableGridSpecialBreakElement,
                    timeTableGridBreakDuration: timeTableGrid.timeTableGrid[0].timeTableGridSpecialBreak[0].timeTableGridBreakDuration,
                }
            }

            return {
                status: RETURN_DATA.SUCCESS.status,
                data: timeTableGrid,
            }
        } catch {
            return RETURN_DATA.DATABASE_ERROR;
        }
    }

    async getTimeTableElement(timeTableElementUUID: string, request): Promise<ReturnMessage> {
        try {
            const element = await prisma.timeTableElement.findUnique({
                where: {
                    timeTableElementUUID,
                },
                include: {
                    schoolSubjects: true,
                    timeTableTeachers: {
                        include: {
                            users: true,
                        },
                    },
                    schoolRoom: true,
                }
            })

            const timeTableElementData = {
                timeTableElementUUID: element.timeTableElementUUID,
                timeTableElementStartTime: element.timeTableElementStartTime,
                timeTableElementEndTime: element.timeTableElementEndTime,
                timeTableElementDay: element.timeTableElementDay,
                timeTableElementRoom: {
                    schoolRoomUUID: element.schoolRoom.schoolRoomUUID,
                    schoolRoomName: element.schoolRoom.schoolRoomName,
                    schoolRoomAbbreviation: element.schoolRoom.schoolRoomAbbreviation,
                    schoolRoomBuilding: element.schoolRoom.schoolRoomBuilding,
                },
                schoolSubjectName: element.schoolSubjects.schoolSubjectName,
                timeTableElementTeachers: element.timeTableTeachers.map((teacher) => {
                    return {
                        userUUID: teacher.users.userUUID,
                        userFirstname: teacher.users.userFirstname,
                        userLastname: teacher.users.userLastname,
                        userEmail: teacher.users.userEmail,
                    }
                })
            }

            return {
                status: 200,
                data: timeTableElementData,
            }
        } catch {
            return RETURN_DATA.DATABASE_ERROR;
        }
    }

    async addTimeTableGrid(body: any, request): Promise<ReturnMessage> {
        const { schoolUUID, timeTableGridMaxLessons, timeTableGridElementDuration, timeTableGridBreakDuration, timeTableGridSpecialBreakElement, timeTableGridStartTime, timeTableGridSpecialBreakDuration } = body

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
                        }
                    },
                    timeTableGridSpecialBreak: {
                        create: {
                            timeTableGridSpecialBreakElement,
                            timeTableGridSpecialBreakDuration,
                        }
                    },
                }
            })

            return {
                status: 200,
                data: timeTableGrid,
            }
        } catch {
            return RETURN_DATA.DATABASE_ERROR;
        }
    }

    async editTimeTableGrid(body: any, request): Promise<ReturnMessage> {
        const { schoolUUID, timeTableGridMaxLessons, timeTableGridElementDuration, timeTableGridBreakDuration, timeTableGridSpecialBreakElement, timeTableGridStartTime, timeTableGridSpecialBreakDuration } = body

        try {
            const school = await prisma.schools.findUnique({
                where: {
                    schoolUUID,
                }
            })

            const timeTableGrid = await prisma.timeTableGrid.update({
                where: {
                    schoolId: school.schoolId,
                },
                data: {
                    timeTableGridStartTime: new Date(timeTableGridStartTime),
                    timeTableGridElementDuration,
                    timeTableGridMaxLessons,
                    timeTableGridBreakDuration,
                    timeTableGridSpecialBreak: {
                        update: {
                            timeTableGridSpecialBreakElement,
                            timeTableGridSpecialBreakDuration,
                        }
                    },
                }
            })

            return {
                status: 200,
                data: new TimeTableGrid(timeTableGrid),
            }
        } catch {
            return RETURN_DATA.DATABASE_ERROR;
        }
    }

    async deleteTimeTableGrid(schoolUUID: string, request): Promise<ReturnMessage> {
        try {
            const school = await prisma.schools.findUnique({
                where: {
                    schoolUUID,
                }
            })

            const timeTableGrid = await prisma.timeTableGrid.delete({
                where: {
                    schoolId: school.schoolId,
                }
            })

            return {
                status: 200,
            }
        } catch {
            return RETURN_DATA.DATABASE_ERROR;
        }
    }

    async addHoliday(holiday, request): Promise<Holiday> {
        const { schoolUUID, holidayName, holidayStartDate, holidayEndDate } = holiday;

        if (holidayStartDate > holidayEndDate) throw new BadRequestException('Start date must be before end date');

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
            return new Holiday(holiday);
        } catch {
            throw new InternalServerErrorException('Database error');
        }
    }

    async getHolidayOfSchool(schoolUUID: string): Promise<Holiday[] | Holiday> {
        try {
            const school = await prisma.schools.findUnique({
                where: {
                    schoolUUID,
                },
                include: {
                    holidays: true,
                }
            });

            return school.holidays.map((holiday) => new Holiday(holiday));
        } catch {
            throw new InternalServerErrorException('Database error')
        }
    }

    async removeHoliday(holidayUUID: string): Promise<number> {
        try {
            await prisma.holidays.delete({
                where: {
                    holidayUUID,
                }
            });
            return 200;
        } catch {
            throw new InternalServerErrorException('Database error')
        }
    }

    async updateHoliday(payload: UpdateHolidayDTO, request: Request): Promise<Holiday> {
        const { holidayUUID, holidayName, holidayStartDate, holidayEndDate } = payload;

        if (holidayStartDate > holidayEndDate) throw new BadRequestException('Start date must be before end date');

        try {
            const holiday = await prisma.holidays.update({
                where: {
                    holidayUUID,
                },
                data: {
                    holidayName,
                    holidayStartDate: new Date(holidayStartDate),
                    holidayEndDate: new Date(holidayEndDate),
                }
            });
            return new Holiday(holiday);
        } catch {
            throw new InternalServerErrorException('Database error');
        }
    }

    async addSubstitution(substitutions: any, request): Promise<ReturnMessage> {
        const jwt = await this.helper.extractJWTToken(request);
        const userUUID = await this.helper.getUserUUIDfromJWT(jwt);
        const { timeTableElementUUID, timeTableSubstitutionDate, timeTableSubstitutionTeachers, schoolRoomUUID, schoolSubject, schoolClasses } = substitutions;

        try {
            const substitution = await prisma.timeTableSubstitutions.create({
                data: {
                    timeTableSubstitutionUUID: `${ID_STARTERS.SUBSTITUTION}${uuidv4()}`,
                    timeTableSubstitutionDate,
                    timeTableElements: {
                        connect: {
                            timeTableElementUUID,
                        }
                    },
                    schoolRooms: {
                        connect: {
                            schoolRoomUUID,
                        }
                    },
                    users: {
                        connect: {
                            userUUID,
                        }
                    },
                    schoolSubjects: {
                        connect: {
                            schoolSubjectUUID: schoolSubject,
                        }
                    },
                    timeTableSubstitutionClasses: {
                        create: schoolClasses.map((subject) => {
                            return {
                                schoolClasses: {
                                    connect: {
                                        schoolSubjectUUID: subject,
                                    }
                                }
                            }
                        })
                    },
                }
            })

            if (timeTableSubstitutionTeachers.length > 0) {
                await prisma.timeTableSubstitutionTeachers.createMany({
                    data: timeTableSubstitutionTeachers.map((teacher) => {
                        return {
                            timeTableSubstitutionUUID: substitution.timeTableSubstitutionUUID,
                            users: {
                                connect: {
                                    userUUID: teacher,
                                }
                            }
                        }
                    })
                })
            }

            return {
                status: RETURN_DATA.SUCCESS.status,
                data: substitution,
            }
        } catch {
            return RETURN_DATA.DATABASE_ERROR;
        }
    }

    async addExam(payload: AddExamDTO, request: Request): Promise<Exam> {
        const { timeTableElementUUID, timeTableExamDate, timeTableExamDescription, timeTableExamRoomUUID } = payload;

        try {
            const exam = await prisma.timeTableExam.create({
                data: {
                    timeTableExamUUID: `${ID_STARTERS.EXAM}${uuidv4()}`,
                    schoolRooms: {
                        connect: {
                            schoolRoomUUID: timeTableExamRoomUUID,
                        },
                    },
                    timeTableExamDescription,
                    timeTableExamDate,
                    timeTableElements: {
                        connect: {
                            timeTableElementUUID,
                        },
                    },
                }
            })
            return new Exam(exam);
        } catch {
            throw new InternalServerErrorException('Database error');
        }
    }

    async updateExam(payload: UpdateExamDTO, request: Request): Promise<Exam> {
        const { timeTableExamUUID, timeTableExamDate, timeTableExamDescription } = payload;

        try {
            const exam = await prisma.timeTableExam.update({
                where: {
                    timeTableExamUUID,
                },
                data: {
                    timeTableExamDescription,
                    timeTableExamDate,
                }
            })
            return new Exam(exam);
        } catch {
            throw new InternalServerErrorException('Database error');
        }
    }

    async deleteExam(examUUID: string, request: Request): Promise<number> {
        try {
            await prisma.timeTableExam.delete({
                where: {
                    timeTableExamUUID: examUUID,
                }
            })
            return 200;
        } catch {
            throw new InternalServerErrorException('Database error');
        }
    }

    async getExam(examUUID: string, request: Request): Promise<Exam> {
        try {
            const exam = await prisma.timeTableExam.findUnique({
                where: {
                    timeTableExamUUID: examUUID,
                },
            })
            return new Exam(exam);
        } catch {
            throw new InternalServerErrorException('Database error');
        }
    }

    async getExamsOfUser(request: Request): Promise<TimeTableElement[] | TimeTableElement> {
        const jwt = await this.helper.extractJWTToken(request);
        const userUUID = await this.helper.getUserUUIDfromJWT(jwt);

        try {
            const exams = await prisma.schoolClasses.findMany({
                where: {
                    schoolClassUsers: {
                        some: {
                            users: {
                                userUUID,
                            }
                        },
                    },
                },
                include: {
                    timeTableElementClasses: {
                        include: {
                            timeTableElements: {
                                include: {
                                    timeTableExam: true,
                                }
                            }
                        }
                    }
                }
            })

            return exams.map((exam) => {
                return exam.timeTableElementClasses.map((element) => {
                    return element.timeTableElements
                })
            }).flat().map((timeTableElement) => {
                if (timeTableElement.timeTableExam.length > 0) {
                    return new TimeTableElement({
                        ...timeTableElement,
                        timeTableExam: new Exam(timeTableElement.timeTableExam[0]),
                    })
                }
            }).filter((element) => element !== undefined);
        } catch {
            throw new InternalServerErrorException('Database error');
        }
    }
}
