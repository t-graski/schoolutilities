import { IsDate, IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";
import { IsCustomUUID } from "src/decorators/IsCustomUUID";

export class AddTimeTableDto {
    @IsNotEmpty()
    timetableDay: TimeTableDay[]
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
}