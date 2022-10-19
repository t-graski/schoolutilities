import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Observable } from 'rxjs';
import { HelperService } from 'src/helper/helper.service';
import { RETURN_DATA, UNTIS_API_URL, ID_STARTERS } from 'src/misc/parameterConstants';
import { ReturnMessage } from 'src/types/Course';
import { firstValueFrom } from 'rxjs'
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

@Injectable()
export class UntisImportService {

    constructor(private readonly helper: HelperService,
        private readonly httpService: HttpService) { }

    async importUntis(payload, request): Promise<ReturnMessage> {
        const response = await this.unitsLogin();
        const { schoolUUID } = payload;
        const token = await this.helper.extractJWTToken(request);
        const schoolId = await this.helper.getSchoolIdByUUID(schoolUUID);
        const userUUID = await this.helper.getUserUUIDfromJWT(token);
        try {

            const schoolClasses = await this.untisRequest("getKlassen", response);
            const schoolSubjects = await this.untisRequest("getSubjects", response);
            const schoolRooms = await this.untisRequest("getRooms", response);
            const departments = await this.untisRequest("getDepartments", response);
            const offDays = await this.untisRequest("getHolidays", response);

            // for (const department of departments.data.result) {
            //     try {
            //         await this.createDepartmentsWithSchoolClasses(department, schoolUUID, schoolClasses);
            //     } catch {
            //         throw new InternalServerErrorException('Error while creating departments and classes');
            //     }
            // };

            const schoolRoomData = await this.mapSchoolRooms(schoolRooms, schoolId);

            // try {
            //     await prisma.schoolRooms.createMany({
            //         data: schoolRoomData
            //     })
            // } catch (err) {
            //     console.log(err);
            //     throw new InternalServerErrorException('Error while creating school rooms');
            // }

            const schoolSubjectData = await this.mapSchoolSubjects(schoolSubjects, schoolId);

            // try {
            //     await prisma.schoolSubjects.createMany({
            //         data: schoolSubjectData
            //     });
            // } catch (err) {
            //     throw new InternalServerErrorException('Error while creating school subjects');
            // }

            const classesOfSchool = await this.getClassesOfSchool(schoolUUID);
            const schoolSubjectsData = await this.getSchoolSubjectsOfSchool(schoolUUID);
            const schoolRoomsData = await this.getSchoolRoomsOfSchool(schoolUUID);

            classesOfSchool.forEach(async (schoolClass) => {
                const monday = this.getDayStringOf('Monday');
                const friday = this.getDayStringOf('Friday');
                const schoolClassId = schoolClasses.data.result.find((schoolClazz) => schoolClazz.name === schoolClass.schoolClassName).id;
                const timeTable = await this.untisRequest('getTimetable', response, {
                    "id": schoolClassId,
                    "type": 1,
                    "startDate": monday,
                    "endDate": friday,
                });

                const schoolClassUUID = schoolClass.schoolClassUUID;
                timeTable.data.result.forEach(async (lesson) => {
                    setTimeout(async () => {
                        const schoolSubjectIds = await this.getSchoolSubjectIds(lesson, schoolSubjects.data.result, schoolSubjectsData);
                        const schoolRoomIds = await this.getSchoolRoomIds(lesson, schoolRooms.data.result, schoolRoomsData);

                        const timeTableElementDate = new Date(lesson.date.toString().substring(0, 4), lesson.date.toString().substring(4, 6) - 1, lesson.date.toString().substring(6, 8));
                        const timeTableElementDay = new Date(timeTableElementDate).toLocaleDateString('en-US', { weekday: 'long' });
                        const timeTableElementStartTime = new Date(lesson.date);
                        lesson.startTime = lesson.startTime.toString().length == 3 ? '0' + lesson.startTime : lesson.startTime;
                        timeTableElementStartTime.setHours(lesson.startTime.toString().substring(0, 2));
                        timeTableElementStartTime.setMinutes(lesson.startTime.toString().substring(2, 4));

                        const timeTableElementEndTime = new Date(lesson.date);
                        lesson.endTime = lesson.endTime.toString().length == 3 ? '0' + lesson.endTime : lesson.endTime;
                        timeTableElementEndTime.setHours(lesson.endTime.toString().substring(0, 2));
                        timeTableElementEndTime.setMinutes(lesson.endTime.toString().substring(2, 4));

                        await prisma.timeTableElement.create({
                            data: {
                                schoolRoom: {
                                    connect: {
                                        schoolRoomId: schoolRoomIds[0],

                                    }
                                },
                                schoolSubjects: {
                                    connect: {
                                        schoolSubjectId: schoolSubjectIds[0],
                                    }
                                },
                                timeTableElementUUID: `${ID_STARTERS.TIME_TABLE_ELEMENT}${uuidv4()}`,
                                timeTableElementStartTime: timeTableElementStartTime,
                                timeTableElementEndTime: timeTableElementEndTime,
                                timeTableElementDay: timeTableElementDay,
                                users: {
                                    connect: {
                                        userUUID,
                                    },
                                },
                                timeTableElementClasses: {
                                    create: {
                                        schoolClasses: {
                                            connect: {
                                                schoolClassUUID,
                                            },
                                        },
                                    }
                                },
                            },
                        });
                    }, 100);
                });
            });
            return RETURN_DATA.SUCCESS;
        } catch {
            return RETURN_DATA.DATABASE_ERROR;
        }
    }

    async createDepartmentsWithSchoolClasses(department: any, schoolUUID: string, schoolClasses: any): Promise<any> {
        await prisma.departments.create({
            data: {
                departmentName: department.longName,
                departmentUUID: `${ID_STARTERS.DEPARTMENT}${uuidv4()}`,
                departmentAbbreviation: department.name,
                departmentChildsVisible: true,
                departmentIsVisible: true,
                schools: {
                    connect: {
                        schoolUUID,
                    },
                },
                schoolClasses: {
                    create: schoolClasses.data.result.filter((schoolClass) => schoolClass.did === department.id).map((schoolClass) => {
                        return {
                            schoolClassUUID: `${ID_STARTERS.CLASS}${uuidv4()}`,
                            schoolClassName: schoolClass.name,
                        }
                    }),
                }
            }
        })
    }

    async mapSchoolRooms(schoolRooms: any, schoolId: number): Promise<any> {
        return schoolRooms.data.result.map((room) => {
            return {
                schoolRoomUUID: `${ID_STARTERS.ROOM}${uuidv4()}`,
                schoolRoomName: room.longName,
                schoolRoomAbbreviation: room.name,
                schoolRoomBuilding: room.building,
                schoolId,
            }
        });
    }

    async mapSchoolSubjects(schoolSubjects: any, schoolId: number): Promise<any> {
        return schoolSubjects.data.result.map((subject) => {
            return {
                schoolSubjectUUID: `${ID_STARTERS.SUBJECT}${uuidv4()}`,
                schoolSubjectName: subject.longName,
                schoolSubjectAbbreviation: subject.name,
                schoolId,
            }
        });
    }

    async getClassesOfSchool(schoolUUID: string): Promise<any> {
        return prisma.schoolClasses.findMany({
            where: {
                departments: {
                    schools: {
                        schoolUUID,
                    },
                }
            }
        });
    }

    async getSchoolSubjectsOfSchool(schoolUUID: string): Promise<any> {
        return prisma.schoolSubjects.findMany({
            where: {
                school: {
                    schoolUUID,
                }
            }
        })
    }

    async getSchoolRoomsOfSchool(schoolUUID: string): Promise<any> {
        return prisma.schoolRooms.findMany({
            where: {
                schools: {
                    schoolUUID,
                }
            }
        })
    }

    async untisRequest(method, response, params?): Promise<any> {
        const cookie = response.headers['set-cookie'][0];

        return firstValueFrom(this.httpService.post(UNTIS_API_URL, {
            "id": "id",
            "method": method,
            "params": params,
            "jsonrpc": "2.0"
        }, {
            headers: {
                'Cookie': cookie
            },
        }));
    }

    async unitsLogin(): Promise<any> {
        return firstValueFrom(this.httpService.post(UNTIS_API_URL, {
            "id": "id",
            "method": "authenticate",
            "params": {
                "user": "it180190",
                "password": "Elly1718_",
                "client": "CLIENT"
            },
            "jsonrpc": "2.0"
        }));
    }

    unitsLogout(response): any {
        const cookie = response.headers['set-cookie'][0];

        return firstValueFrom(this.httpService.post(UNTIS_API_URL, {
            "id": "id",
            "method": "logout",
            "params": {},
            "jsonrpc": "2.0"
        }, {
            headers: {
                'Cookie': cookie
            },
        }));
    }

    getDayStringOf(weekday: string): string {
        let date = new Date();
        switch (weekday) {
            case 'Monday':
                date.setDate(date.getDate() - date.getDay() + 1);
                return date.getFullYear() + '' + (date.getMonth() + 1).toString().padStart(2, '0') + '' + date.getDate().toString().padStart(2, '0');
            case 'Tuesday':
                date.setDate(date.getDate() - date.getDay() + 2);
                return date.getFullYear() + '' + (date.getMonth() + 1).toString().padStart(2, '0') + '' + date.getDate().toString().padStart(2, '0');
            case 'Wednesday':
                date.setDate(date.getDate() - date.getDay() + 3);
                return date.getFullYear() + '' + (date.getMonth() + 1).toString().padStart(2, '0') + '' + date.getDate().toString().padStart(2, '0');
            case 'Thursday':
                date.setDate(date.getDate() - date.getDay() + 4);
                return date.getFullYear() + '' + (date.getMonth() + 1).toString().padStart(2, '0') + '' + date.getDate().toString().padStart(2, '0');
            case 'Friday':
                date.setDate(date.getDate() - date.getDay() + 5);
                return date.getFullYear() + '' + (date.getMonth() + 1).toString().padStart(2, '0') + '' + date.getDate().toString().padStart(2, '0');
            case 'Saturday':
                date.setDate(date.getDate() - date.getDay() + 6);
                return date.getFullYear() + '' + (date.getMonth() + 1).toString().padStart(2, '0') + '' + date.getDate().toString().padStart(2, '0');
            case 'Sunday':
                date.setDate(date.getDate() - date.getDay() + 7);
                return date.getFullYear() + '' + (date.getMonth() + 1).toString().padStart(2, '0') + '' + date.getDate().toString().padStart(2, '0');
        }
    }

    async getUntisSubjectData(lesson: any, schoolSubjects: any): Promise<any> {
        let untisSubjects = []
        if (lesson.su.length < 1) {
            return false;
        }
        lesson.su.forEach((subject) => {
            let untisSubject = schoolSubjects.find((schoolSubject) => schoolSubject.id === subject.id);
            untisSubjects.push(untisSubject);
        });
        return untisSubjects;
    }

    async getSchoolSubjectIds(lesson: any, schoolSubjectsData: any, schoolSubjectDb: any): Promise<any> {
        const untisSubjects = await this.getUntisSubjectData(lesson, schoolSubjectsData);

        return schoolSubjectDb.filter((schoolSubject) => {
            if (!untisSubjects) return schoolSubjectsData[0];
            let subject = untisSubjects.find((untisSubject) => untisSubject.name === schoolSubject.schoolSubjectAbbreviation);
            return subject;


        }).map((schoolSubject) => {
            return schoolSubject.schoolSubjectId;
        });
    }

    async getUntisRoomsData(lesson: any, schoolRooms: any): Promise<any> {
        let untisRooms = []
        if (lesson.ro.length > 1) return false;
        lesson.ro.forEach((room) => {
            let untisRoom = schoolRooms.find((schoolRoom) => schoolRoom.id === room.id);
            untisRooms.push(untisRoom);
        });
        return untisRooms;
    }

    async getSchoolRoomIds(lesson: any, schoolRoomsData: any, schoolRoomDb: any): Promise<any> {
        return schoolRoomDb.filter(async (schoolRoom) => {
            const untisRooms = await this.getUntisRoomsData(lesson, schoolRoomsData);
            try {
                return untisRooms.find((untisRoom) => untisRoom.name === schoolRoom.schoolRoomAbbreviation);
            } catch {
                return schoolRoomsData[0];
            }
        }).map((schoolRoom) => {
            return schoolRoom.schoolRoomId;
        });
    }
}
