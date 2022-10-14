import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Course } from "../course/course";
import { Language } from "../language/language";

export class School  {
    // schoolUUID: string;
    // schoolName: string;
    // schoolDescription: string;
    // schoolLanguage: Language;
    // // schoolTimezone: Timezone;
    // schoolCreationTimestamp: Date;
    // // schoolCreator: User;
    // schoolCanUpload: boolean;

    // @ApiProperty({
    //     description: 'The courses of a school',
    //     type: [Course],
    // })
    // courses?: Course[];

    // @ApiProperty({
    //     description: 'The departments of a school',
    //     type: [Department],
    // })
    // departments?: Department[];

    // @ApiProperty({
    //     description: 'The join codes of a school',
    //     type: [JoinCode],
    // })
    // schoolJoinCodes?: JoinCode[];

    // @ApiProperty({
    //     description: 'The users of a school',
    //     type: [User],
    // })
    // schoolUsers: User[];

    // @ApiProperty({
    //     description: 'The school rooms of a school',
    //     type: () => [SchoolRoom],
    // })
    // schoolRooms?: SchoolRoom[];

    // @ApiProperty({
    //     description: 'The subjects of a school',
    //     type: [SchoolSubject],
    // })
    // schoolSubjects?: SchoolSubject[];

    // // @ApiProperty()
    // // schoolHolidays: SchoolHoli[]; 

    // constructor(partial: Partial<School>) {
    //     Object.assign(this, partial);
    // }
}

export class AddSchoolDTO {
    schoolName: string;
    schoolDescription: string;
    schoolLanguageId: number;
    schoolTimezone: string;
}

export class UpdateSchoolDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    schoolUUID: string;

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

export class DeleteSchoolDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    schoolUUID: string;
}

export class GetSchoolDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    schoolUUID: string;
}