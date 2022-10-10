import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Course } from "../course/course";
import { Department } from "../department/department";
import { JoinCode } from "../join-code/joinCode";
import { Language } from "../language/language";
import { SchoolRoom } from "../school-room/schoolRoom";
import { SchoolSubject } from "../subject/schoolSubject";
import { Timezone } from "../timezone/timezone";
import { User } from "../user/user";

export class School {
    @Exclude()
    schoolId: number;

    @Exclude()
    schoolCreatorId: number;

    @ApiProperty({
        description: 'The UUID of the school',
        example: 'e8b3b9c0-5b9e-11eb-ae93-0242ac130002',
        type: String,
    })
    schoolUUID: string;

    @ApiProperty({
        description: 'The name of the school',
        example: 'HTL Leonding',
        type: String,
    })
    schoolName: string;

    @ApiProperty({
        description: 'The description of the school',
        example: 'The HTL Leonding is a school in Leonding',
        type: String,
    })
    schoolDescription: string;

    @ApiProperty({
        description: 'The preffered language of the school',
        type: Language,
    })
    schoolLanguage: Language;

    // @ApiProperty()
    // schoolTimezone: Timezone;

    @ApiProperty({
        description: 'The creation timestamp of the school',
        example: '2021-01-20T12:00:00.000Z',
        type: Date,
    })
    schoolCreationTimestamp: Date;

    @ApiProperty({
        description: 'The creator of the school',
        type: User,
    })
    schoolCreator: User;

    @ApiProperty({
        description: 'Decides if a school can upload files',
        example: true,
        type: Boolean,
    })
    schoolCanUpload: boolean;

    @ApiProperty({
        description: 'The courses of a school',
        type: [Course],
    })
    courses?: Course[];

    @ApiProperty({
        description: 'The departments of a school',
        type: [Department],
    })
    departments?: Department[];

    @ApiProperty({
        description: 'The join codes of a school',
        type: [JoinCode],
    })
    schoolJoinCodes?: JoinCode[];

    @ApiProperty({
        description: 'The users of a school',
        type: [User],
    })
    schoolUsers: User[];

    @ApiProperty()
    schoolRooms?: SchoolRoom[];

    @ApiProperty({
        description: 'The subjects of a school',
        type: [SchoolSubject],
    })
    schoolSubjects?: SchoolSubject[];

    // @ApiProperty()
    // schoolHolidays: SchoolHoli[]; 

    constructor(partial: Partial<School>) {
        Object.assign(this, partial);
    }
}

export class AddSchoolDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    schoolName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    schoolDescription: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    schoolLanguageId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    schoolTimezone: string;
}

export class UpdateSchoolDTO {
    schoolUUID: string;
    schoolName: string;
    schoolDescription: string;
    schoolLanguageId: number;
    schoolTimezone: string;
}

export class DeleteSchoolDTO {
    schoolUUID: string;
}

export class GetSchoolDTO {
    schoolUUID: string;
}