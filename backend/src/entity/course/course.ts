import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { IsCustomUUID } from "src/decorators/IsCustomUUID";
import { CourseElement } from "../course-element/courseElement";
import { FileSubmissionGrade } from "../file-submission-grade/fileSubmissionGrade";
import { School } from "../school/school";
import { SchoolClass } from "../schoolClass/schoolClass";
import { SchoolSubject } from "../subject/schoolSubject";
import { User } from "../user/user";

export class Course {
    @Exclude()
    courseId: number;

    @Exclude()
    courseSchoolId: number;

    @Exclude()
    courseSubjectId: number;

    @Exclude()
    courseCreatorId: number;

    courseUUID: string;
    courseName: string;
    courseDescription: string;
    school?: School;
    schoolSubject?: SchoolSubject;
    courseCreationTimestamp: Date;
    creator?: User;
    schoolClasses?: SchoolClass[];
    courseElements?: CourseElement[];
    courseFileSubmmissionGrades?: FileSubmissionGrade[];

    constructor(partial: Partial<Course>) {
        Object.assign(this, partial);
    }
}

export class AddCourseDTO {
    @ApiProperty()
    @IsNotEmpty()
    @Length(2, 30)
    courseName: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(2, 200)
    courseDescription: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsCustomUUID()
    schoolUUID: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsCustomUUID()
    schoolSubjectUUID: string;

    @ApiProperty()
    @IsOptional()
    @IsCustomUUID({ each: true })
    users: string[];

    @ApiProperty()
    @IsOptional()
    @IsCustomUUID({ each: true })
    courseClasses: string[];
}

export class UpdateCourseDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsCustomUUID()
    courseUUID: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    @Length(2, 30)
    courseName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    @Length(2, 200)
    courseDescription: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    schoolSubjectUUID: string;

    @ApiProperty()
    @IsOptional()
    @IsCustomUUID({ each: true })
    users: string[];

    @ApiProperty()
    @IsOptional()
    @IsCustomUUID({ each: true })
    courseClasses: string[];
}

export class DeleteCourseDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsCustomUUID()
    courseUUID: string;
}

export class GetCourseDTO {
    courseUUID: string;
}