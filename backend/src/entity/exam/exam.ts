import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import { SchoolRoom } from "../school-room/schoolRoom";

export class Exam {
    @Exclude()
    timeTableExamId: number;

    @Exclude()
    timeTableElementId: number;

    @Exclude()
    timeTableExamRoomId: number;

    @Exclude()
    schoolRooms?: SchoolRoom;

    @ApiProperty({
        description: 'The UUID of the exam',
        example: 'e8b3b9c0-5b9e-11eb-ae93-0242ac130002',
        type: String,
    })
    timeTableExamUUID: string;

    @ApiProperty({
        description: 'The description of the exam',
        example: 'The exam is about the topic "NestJS"',
        type: String,
    })
    timeTableExamDescription: string;

    @ApiProperty({
        description: 'The date of the exam',
        example: '2021-01-20T12:00:00.000Z',
        type: Date,
    })
    timeTableExamDate: Date;

    timeTableElementUUID: string;

    timeTableExamSchoolClasses: string[];

    @ApiProperty({
        description: 'The room uuid of the exam',
        type: SchoolRoom,
    })
    timeTableExamRoom: SchoolRoom;

    // timeTableElements: timeTableelement

    constructor(partial: Partial<Exam>) {
        Object.assign(this, partial);
    }
}

export class AddExamDTO {
    @ApiProperty()
    @IsNotEmpty()
    timeTableElementUUID: string;

    @ApiProperty()
    @IsNotEmpty()
    timeTableExamRoom: Record<string, any>;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    timeTableExamDescription: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    timeTableExamDate: Date;
}

export class UpdateExamDTO {
    @ApiProperty()
    @IsNotEmpty()
    timeTableExamUUID: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    timeTableExamDescription: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    timeTableExamDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    timeTableExamRoom: Record<string, any>;
}

export class DeleteExamDTO {
    @ApiProperty()
    @IsNotEmpty()
    timeTableExamUUID: string;
}

export class GetExamDTO {
    @ApiProperty()
    @IsNotEmpty()
    timeTableExamUUID: string;
}