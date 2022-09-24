import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { DatabaseService } from 'src/database/database.service';
import { AddTimeTableDto } from 'src/dto/addTimeTable';
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
        let elements = []

        payload.timetableDay.forEach((day) => {
            day.timeTableElements.forEach((element) => {
                prisma.timeTableElement.create({
                    data: {
                        timeTableElementUUID: `${ID_STARTERS.TIME_TABLE_ELEMENT}${uuidv4()}`,
                        schoolSubjects: {
                            connect: {
                                schoolSubjectId: element.timetableElementSubjectId
                            },
                        },
                        timeTableElementRoomId: 0,
                        schoolClasses: {
                            connect: {
                                schoolClassUUID: element.timeTableElementClasses
                            },
                        },
                        timeTableElementStartTime: element.timeTableElementStartTime,
                        timeTableElementEndTime: element.timeTableElementEndTime,
                        users: {
                            connect: {
                                userUUID: element.timeTableElementTeachers
                            },
                        },
                        timeTableElementDay: day.timeTableDay,

                    }
                })
            }
            )
        })

        return RETURN_DATA.SUCCESS
    }
}
