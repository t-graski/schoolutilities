import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class Holiday {
    @Exclude()
    holidayId: number;

    @Exclude()
    schoolId: number;

    @ApiProperty({
        description: 'The UUID of the holiday',
        example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
        type: String,
    })
    holidayUUID: string;

    @ApiProperty({
        description: 'The name of the holiday',
        example: 'Christmas',
        type: String,
    })
    holidayName: string;

    @ApiProperty({
        description: 'The startdate of the holiday',
        example: '2020-12-24',
        type: String,
    })
    holidayStartDate: Date;

    @ApiProperty({
        description: 'The enddate of the holiday',
        example: '2020-12-26',
        type: String,
    })
    holidayEndDate: Date;

    constructor(partial: Partial<Holiday>) {
        Object.assign(this, partial);
    }
}

export class AddHolidayDTO {

    @ApiProperty({
        description: 'The UUID of the school',
        example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    schoolUUID: string;

    @ApiProperty({
        description: 'The name of the holiday',
        example: 'Christmas',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    holidayName: string;

    @ApiProperty({
        description: 'The startdate of the holiday',
        example: '2020-12-24',
        type: String,
    })
    @IsNotEmpty()
    @IsDateString()
    holidayStartDate: string;

    @ApiProperty({
        description: 'The enddate of the holiday',
        example: '2020-12-26',
        type: String,
    })
    @IsNotEmpty()
    @IsDateString()
    holidayEndDate: string;
}

export class UpdateHolidayDTO {

    @ApiProperty({
        description: 'The UUID of the holiday',
        example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    holidayUUID: string;

    @ApiProperty({
        description: 'The name of the holiday',
        example: 'Christmas',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    holidayName: string;

    @ApiProperty({
        description: 'The startdate of the holiday',
        example: '2020-12-24',
        type: String,
    })
    @IsNotEmpty()
    @IsDateString()
    holidayStartDate: string;

    @ApiProperty({
        description: 'The enddate of the holiday',
        example: '2020-12-26',
        type: String,
    })
    @IsNotEmpty()
    @IsDateString()
    holidayEndDate: string;
}