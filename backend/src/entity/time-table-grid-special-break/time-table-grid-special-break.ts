import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class TimeTableGridSpecialBreak {
    @Exclude()
    timeTableGridSpecialBreakId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    timeTableGridSpecialBreakElement: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    timeTableGridSpecialBreakDuration: number;
}
