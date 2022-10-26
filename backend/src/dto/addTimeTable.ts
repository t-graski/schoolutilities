import { IsDate, IsDateString, isDateString, IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";
import { IsCustomUUID } from "src/decorators/IsCustomUUID";

export class AddTimeTableDto {
    @IsNotEmpty()
    timetableDay: TimeTableDay[]
}

export class AddTimeTableElementDto {
    @IsNotEmpty()
    @IsDateString()
    timeTableElementStartTime: string;

    @IsNotEmpty()
    @IsDateString()
    timeTableElementEndTime: string;

    @IsNotEmpty()
    @IsString()
    timeTableElementDay: string;

    @IsNotEmpty()
    @IsString()
    schoolSubjectUUID: string;

    @IsNotEmpty()
    @IsString({ each: true })
    timeTableElementTeachers: string[];

    @IsNotEmpty()
    @IsString()
    timeTableElementRoom: string;

    @IsNotEmpty()
    @IsString({ each: true })
    timeTableElementClasses: string[];
}

export class UpdateTimeTableElementDto {
    @IsNotEmpty()
    @IsString()
    timeTableElementUUID: string

    @IsNotEmpty()
    @IsString()
    timeTableElementDay: string;

    @IsNotEmpty()
    @IsDateString()
    timeTableElementStartTime: string;

    @IsNotEmpty()
    @IsDateString()
    timeTableElementEndTime: string;

    @IsNotEmpty()
    @IsString()
    schoolSubjectUUID: string;

    @IsNotEmpty()
    @IsString({ each: true })
    timeTableElementTeachers: string[];

    @IsNotEmpty()
    @IsString()
    timeTableElementRoom: string;

    @IsNotEmpty()
    @IsString({ each: true })
    timeTableElementClasses: string[];
}

export class TimeTableDay {
    timeTableDay: string;
    timeTableElements: TimeTableElement[]
}

export class TimeTableElement {
    @IsNotEmpty()
    @IsString()
    timeTableElementName: string;
    @IsNotEmpty()
    @IsString()
    timeTableElementShortName: string;
    @IsNotEmpty()
    @IsDate()
    timeTableElementStartTime: Date;
    @IsNotEmpty()
    @IsNumber()
    timeTableRoomId: number;
    @IsNotEmpty()
    @IsDate()
    timeTableElementEndTime: Date;
    @IsNotEmpty()
    @IsNumber()
    timetableElementSubjectId: number;
    @IsNotEmpty()
    @IsCustomUUID({ each: true })
    timeTableElementTeachers: string[];
    @IsNotEmpty()
    @IsCustomUUID({ each: true })
    timeTableElementClasses: string[];

    constructor(partial: Partial<TimeTableElement>) {
        Object.assign(this, partial);
    }
}