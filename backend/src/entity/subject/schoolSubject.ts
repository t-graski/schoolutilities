import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { IsCustomUUID } from "src/decorators/IsCustomUUID";
import { Course } from "../course/course";
import { TimeTableElement } from "../time-table-element/timeTableElement";

export class SchoolSubject {
    @Exclude()
    schoolSubjectId: number;

    @Exclude()
    schoolId: number;

    @ApiProperty({
        description: 'The UUID of the school subject',
        example: 'e8b3b9c0-5b9e-11eb-ae93-0242ac130002',
        type: String,
    })
    schoolSubjectUUID: string;

    @ApiProperty({
        description: 'The name of the school subject',
        example: 'Mathematics',
        type: String,
    })
    schoolSubjectName: string;

    @ApiProperty({
        description: 'The abbreviation of the school subject',
        example: 'Math',
        type: String,
    })
    schoolSubjectAbbreviation: string;

    @ApiProperty({
        description: 'The courses of the school subject',
        type: () => [Course],
    })
    courses?: Course[];

    @ApiProperty({
        description: 'The time table elements of the school subject',
        type: [TimeTableElement],
    })
    timeTableElements?: TimeTableElement[]

    constructor(partial: Partial<SchoolSubject>) {
        Object.assign(this, partial);
    }
}

export class AddSchoolSubjectDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsCustomUUID()
    schoolUUID: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    schoolSubjectName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(1, 10)
    schoolSubjectAbbreviation: string;
}

export class UpdateSchoolSubjectDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    schoolSubjectUUID: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    schoolSubjectName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    schoolSubjectAbbreviation: string;
}

export class DeleteSchoolSubjectDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    schoolSubjectUUID: string;
}

export class GetSchoolSubjectDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    schoolSubjectUUID: string;
}