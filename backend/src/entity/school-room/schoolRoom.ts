export type SchoolRoom = {
    schoolRoomUUID: string;
    schoolRoomName: string;
    schoolRoomAbbreviation: string;
    schoolRoomBuilding: string;
    // school: School;
    // timeTableElements: timeTimeElement[];
    // timeTableExams: timeTimeExam[];
}

export class AddSchoolRoomDTO {
    schoolUUID: string;
    schoolRoomName: string;
    schoolRoomAbbreviation: string;
    schoolRoomBuilding: string;
}

export class UpdateSchoolRoomDTO {
    schoolRoomUUID: string;
    schoolRoomName: string;
    schoolRoomAbbreviation: string;
    schoolRoomBuilding: string;
}

export class DeleteSchoolRoomDTO {
    schoolRoomUUID: string;
}

export class GetSchoolRoomDTO {
    schoolRoomUUID: string;
}