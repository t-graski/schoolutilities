import { SchoolRoom } from "../school-room/schoolRoom";
import { SchoolClass } from "../school-class/schoolClass";
import { SchoolSubject } from "../subject/schoolSubject";
import { Exclude } from "class-transformer";
import { Exam } from "../exam/exam";

export class TimeTableElement {
    @Exclude()
    timeTableElementId: number;

    @Exclude()
    timeTableElementSubjectId: number;

    @Exclude()
    timeTableElementRoomId: number;

    @Exclude()
    timeTableElementCreatorId: number;

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
    timeTableExam?: Exam;

    constructor(partial: Partial<TimeTableElement>) {
        Object.assign(this, partial);
    }
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

