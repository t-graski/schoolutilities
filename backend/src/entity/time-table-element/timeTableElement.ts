import { SchoolRoom } from "../school-room/schoolRoom";
import { SchoolClass } from "../school-class/schoolClass";
import { SchoolSubject } from "../subject/schoolSubject";

export type TimeTableElement = {
    timeTableElementUUID: string;
    timeTableElementSubject: SchoolSubject;
    timeTableElementRoom: SchoolRoom;
    timeTableElementStartTime: Date;
    timeTableElementEndTime: Date;
    timeTableElementDay: string;
    timeTableElementCreationTimestamp: Date;
    // creator: User;
    // timeTableTeachers?: User[]
    timeTableElementClasses?: SchoolClass[];
    // timeTableEvents?: TimeTableEvent[];
    // timeTableSubstitution?: TimeTableSubstitution[];
    // timeTableOmitted?: TimeTableOmitted[];
    // timeTableExam?: TimeTableExam[];
}

export class AddTimeTableElementDTO {
    subjectUUID: string;
    roomUUID: string;
    timeTableElementStartTime: Date;
    timeTableElementEndTime: Date;
    timeTableElementDay: string;
    timeTableElementClasses?: string[];
    timeTableElementTeachers?: string[];
}

export class UpdateTimeTableElementDTO {
    timeTableElementUUID: string;
    subjectUUID: string;
    roomUUID: string;
    timeTableElementStartTime: Date;
    timeTableElementEndTime: Date;
    timeTableElementDay: string;
    timeTableElementClasses?: string[];
    timeTableElementTeachers?: string[];
}

export class DeleteTimeTableElementDTO {
    timeTableElementUUID: string;
}

export class GetTimeTableElementDTO {
    timeTableElementUUID: string;
}

