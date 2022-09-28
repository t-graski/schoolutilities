import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
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
        const login = this.unitsLogin();
        const { schoolUUID } = payload;
        const schoolId = await this.helper.getSchoolIdByUUID(schoolUUID);
        const token = await this.helper.extractJWTToken(request);
        const userUUID = await this.helper.getUserUUIDfromJWT(token);

        login.subscribe(async (response) => {
            const schoolClasses = await this.untisRequest("getKlassen", response);
            const schoolSubjects = await this.untisRequest("getSubjects", response);
            const schoolRooms = await this.untisRequest("getRooms", response);
            const departments = await this.untisRequest("getDepartments", response);
            const offDays = await this.untisRequest("getHolidays", response);

            // console.log(schoolSubjects.data.result);


            // for (const department of departments.data.result) {
            //     await prisma.departments.create({
            //         data: {
            //             departmentName: department.longName,
            //             departmentUUID: `${ID_STARTERS.DEPARTMENT}${uuidv4()}`,
            //             departmentAbbreviation: department.name,
            //             departmentChildsVisible: true,
            //             departmentIsVisible: true,
            //             schools: {
            //                 connect: {
            //                     schoolUUID,
            //                 },
            //             },
            //             schoolClasses: {
            //                 create: schoolClasses.data.result.filter((schoolClass) => schoolClass.did === department.id).map((schoolClass) => {
            //                     return {
            //                         schoolClassUUID: `${ID_STARTERS.CLASS}${uuidv4()}`,
            //                         schoolClassName: schoolClass.name,
            //                     }
            //                 }),
            //             }
            //         }
            // })
            // };

            // const schoolRoomData = schoolRooms.data.result.map((room) => {
            //     return {
            //         schoolRoomUUID: `${ID_STARTERS.ROOM}${uuidv4()}`,
            //         schoolRoomName: room.longName,
            //         schoolRoomAbbreviation: room.name,
            //         schoolRoomBuilding: room.building,
            //         schoolId,
            //     }
            // });

            // await prisma.schoolRooms.createMany({
            //     data: schoolRoomData
            // })

            const schoolSubjectData = schoolSubjects.data.result.map((subject) => {
                return {
                    schoolSubjectUUID: `${ID_STARTERS.SUBJECT}${uuidv4()}`,
                    schoolSubjectName: subject.longName,
                    schoolSubjectAbbreviation: subject.name,
                    schoolId,
                }
            });

            await prisma.schoolSubjects.createMany({
                data: schoolSubjectData
            });
        });

        return RETURN_DATA.SUCCESS;
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

    unitsLogin(): Observable<any> {
        return this.httpService.post(UNTIS_API_URL, {
            "id": "id",
            "method": "authenticate",
            "params": {
                "user": "it180190",
                "password": "Elly1718_",
                "client": "CLIENT"
            },
            "jsonrpc": "2.0"
        });
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
}
