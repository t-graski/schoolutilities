import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsCustomUUID } from "src/decorators/IsCustomUUID";
import { SchoolClass } from "../school-class/schoolClass";
import { SchoolRoom } from "../school-room/schoolRoom";
import { SchoolSubject } from "../subject/schoolSubject";
import { TimeTableElement } from "../time-table-element/timeTableElement";
import { User } from "../user/user";

export class Substitution {
    @Exclude()
    timeTableSubstitutionId: number;
    @ApiProperty()
    timeTableSubstitutionUUID: String;
    @Exclude()
    timeTableSubstitutionSubjectId: number;
    @Exclude()
    timeTableSubstitutionRoomId: number;
    @Exclude()
    timeTableSubstitutionCreatorId: number;
    @Exclude()
    timeTableSubstitutionElementId: number;
    @ApiProperty()
    timeTableSubstitutionDate: Date;
    @ApiProperty()
    timeTableSubstitutionTeachers?: User[];
    @ApiProperty()
    timeTableSubstitutionClasses?: SchoolClass[];
    @ApiProperty()
    timeTableElements?: TimeTableElement[];
    @ApiProperty()
    schoolSubject: SchoolSubject;
    @ApiProperty()
    schoolRoom: SchoolRoom;


    constructor(partial: Partial<Substitution>) {
        Object.assign(this, partial);
    }
}