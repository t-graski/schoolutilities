import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { IsCustomUUID } from "src/decorators/IsCustomUUID";
import { CourseElement } from "../course-element/courseElement";
import { FileSubmissionGrade } from "../file-submission-grade/fileSubmissionGrade";
import { School } from "../school/school";
import { SchoolClass } from "../school-class/schoolClass";
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

    @ApiProperty({
        description: 'The UUID of the course',
        example: 'f4a4c2c0-5b9f-11eb-ae93-0242ac130002',
        type: String,
    })
    courseUUID: string;

    @ApiProperty({
        description: 'The name of the course',
        example: 'Math',
        type: String,
    })
    courseName: string;

    @ApiProperty({
        description: 'The description of the course',
        example: 'This course is about math',
        type: String,
    })
    courseDescription: string;

    @ApiProperty({
        description: 'The schoool of a course',
        type: School
    })
    school?: School;

    @ApiProperty({
        description: 'The subject of a course',
        type: SchoolSubject
    })
    schoolSubject?: SchoolSubject;

    @ApiProperty({
        description: 'The creation timestamp of the course',
        example: '2021-01-01T00:00:00.000Z',
        type: Date,
    })
    courseCreationTimestamp: Date;

    @ApiProperty({
        description: 'The creator a the course',
        type: User,
    })
    creator?: User;

    @ApiProperty({
        description: 'Whether user is permitted to edit',
        type: Boolean
    })
    canEdit?: boolean;

    @ApiProperty({
        description: 'The users of a course',
        type: [User],
    })
    courseUsers?: User[];

    @ApiProperty({
        description: 'The classes of a course',
        type: [SchoolClass],
    })
    courseClasses?: SchoolClass[];

    @ApiProperty({
        description: 'The elements of a course',
        type: [CourseElement]
    })
    courseElements?: CourseElement[];

    @ApiProperty({
        description: 'The grades of a course',
        type: [FileSubmissionGrade]
    })
    courseGrades?: FileSubmissionGrade[];

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

export class GetCoursesDTO {
    schoolUUID: string;
}

export class AddCourseUserDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsCustomUUID()
    courseUUID: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsCustomUUID()
    userUUID: string;
}

export class RemoveCourseUserDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsCustomUUID()
    courseUUID: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsCustomUUID()
    userUUID: string;
}