import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { TimeTableGridSpecialBreak } from "../time-table-grid-special-break/time-table-grid-special-break";

export class TimeTableGrid {
    @Exclude()
    timeTableGridId: number;

    @ApiProperty()
    timeTableGridStartTime: Date;

    @ApiProperty()
    timeTableGridElementDuration: number;

    @ApiProperty()
    timeTableGridBreakDuration: number;

    @ApiProperty()
    timeTableGridMaxLessons: number;

    @ApiProperty()
    schoolId: number;

    @ApiProperty()
    timeTableGridSpecialBreak?: TimeTableGridSpecialBreak[];

    constructor(partial: Partial<TimeTableGrid>) {
        Object.assign(this, partial);
    }
}

export class AddTimeTableDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    timeTableGridStartTime: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    timeTableGridElementDuration: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    timeTableGridBreakDuration: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    timeTableGridMaxLessons: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    schoolUUID: string;

    @ApiProperty()
    @IsNotEmpty()
    timeTableGridSpecialBreak?: TimeTableGridSpecialBreak[];
}

export class UpdateTimeTableDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    timeTableGridStartTime: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    timeTableGridElementDuration: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    timeTableGridBreakDuration: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    timeTableGridMaxLessons: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    schoolUUID: string;
}

export class DeleteTimeTableDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    schoolUUID: string;
}

export class GetTimeTableDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    schoolUUID: string;
}
