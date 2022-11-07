import { SchoolRoom } from "../school-room/schoolRoom";
import { SchoolClass } from "../school-class/schoolClass";
import { SchoolSubject } from "../subject/schoolSubject";
import { Exclude } from "class-transformer";
import { Exam } from "../exam/exam";
import { User } from "../user/user";
import { Substitution } from "../substitution/substitution";
import { IsNotEmpty } from "class-validator";

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
    @Exclude()
    schoolRoom: SchoolRoom;
    @Exclude()
    schoolSubject: SchoolSubject;
    timeTableElementRoom: SchoolRoom;
    timeTableElementStartTime: Date;
    timeTableElementEndTime: Date;
    timeTableElementDay: string;
    timeTableElementCreationTimestamp: Date;
    // creator: User;
    timeTableElementTeachers?: User[]
    timeTableElementClasses?: SchoolClass[];
    // timeTableEvents?: TimeTableEvent[];
    timeTableSubstitution?: Substitution[] | Substitution;
    // timeTableOmitted?: TimeTableOmitted[];
    timeTableExam?: Exam;

    constructor(partial: Partial<TimeTableElement>) {
        Object.assign(this, partial);
    }
}

export class AddTimeTableElementDTO {
    timeTableElementSubjectUUID: string;
    timeTableElementRoomUUID: string;
    timeTableElementStartTime: Date;
    timeTableElementEndTime: Date;
    timeTableElementDay: string;
    timeTableElementClasses?: string[];
    timeTableElementTeachers?: string[];
}

export class UpdateTimeTableElementDTO {
    @IsNotEmpty()
    timeTableElementUUID: string;
    @IsNotEmpty()
    timeTableElementSubjectUUID: string;
    @IsNotEmpty()
    timeTableElementRoomUUID: string;
    @IsNotEmpty()
    timeTableElementStartTime: Date;
    @IsNotEmpty()
    timeTableElementEndTime: Date;
    @IsNotEmpty()
    timeTableElementDay: string;
    @IsNotEmpty()
    timeTableElementClasses?: string[];
    @IsNotEmpty()
    timeTableElementTeachers?: string[];
}

export class DeleteTimeTableElementDTO {
    timeTableElementUUID: string;
}

export class GetTimeTableElementDTO {
    timeTableElementUUID: string;
}

