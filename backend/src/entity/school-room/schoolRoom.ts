import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { IsCustomUUID } from "src/decorators/IsCustomUUID";
import { School } from "../school/school";

export class SchoolRoom {
    @ApiProperty({
        description: 'The UUID of the school room',
        example: 'e8b3b9c0-5b9e-11eb-ae93-0242ac130002',
        type: String,
    })
    schoolRoomUUID: string;

    @ApiProperty({
        description: 'The name of the school room',
        example: 'Mathematics Room',
        type: String,
    })
    schoolRoomName: string;

    @ApiProperty({
        description: 'The abbreviation of the school room',
        example: '101a',
        type: String,
    })
    schoolRoomAbbreviation: string;

    @ApiProperty({
        description: 'The building of the school room',
        example: 'A',
        type: String,
    })
    schoolRoomBuilding: string;

    @ApiProperty({
        description: 'The school of the school room',
        type: () => School,
    })
    school: School;
    // timeTableElements: timeTableElement[];
    // timeTableExams: exam[];

    constructor(partial: Partial<SchoolRoom>) {
        Object.assign(this, partial);
    }
}

export class AddSchoolRoomDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsCustomUUID()
    schoolUUID: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    schoolRoomName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    schoolRoomAbbreviation: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    schoolRoomBuilding: string;
}

export class UpdateSchoolRoomDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsCustomUUID()
    schoolRoomUUID: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    schoolRoomName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    schoolRoomAbbreviation: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    schoolRoomBuilding: string;
}

export class DeleteSchoolRoomDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsCustomUUID()
    schoolRoomUUID: string;
}

export class GetSchoolRoomDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsCustomUUID()
    schoolRoomUUID: string;
}