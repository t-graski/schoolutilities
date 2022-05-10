import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { IsArrayUnique } from "src/decorators/IsArrayUnique";
import { IsCourseExist } from "src/decorators/IsCourseExist";
import { IsCustomUUID } from "src/decorators/IsCustomUUID";
import { IsNameAvailable } from "src/decorators/IsNameAvailable";
import { IsUserUUIDExist } from "src/decorators/IsUserUUIDExist";

export class CourseDto {

    @IsNotEmpty()
    @IsInt()
    courseId: number;

    @IsNotEmpty()
    @IsCustomUUID()
    courseUUID: string;

    @IsNotEmpty()
    @Length(2, 100)
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @Length(2, 1000)
    courseDescription: string;

    @IsNotEmpty()
    @IsInt()
    schoolId: number;

    @IsNotEmpty()
    @IsDate()
    creationDate: Date;

    @IsNotEmpty()
    @IsInt()
    personCreationId: number;
}

export class AddCourseDto {
    @IsNotEmpty()
    @IsString()
    @Length(2, 100)
    @IsNameAvailable()
    name: string;

    @IsOptional()
    @IsString()
    @Length(2, 1000)
    courseDescription: string;

    @IsNotEmpty()
    @IsCustomUUID()
    schoolUUID: string;

    @IsOptional()
    @IsArrayUnique()
    @IsCustomUUID({
        each: true,
    })
    @IsUserUUIDExist({
        each: true,
    })
    persons: string[];

    @IsOptional()
    @IsArrayUnique()
    @IsCustomUUID({
        each: true,
    })
    classes: string[];
}

export class RemoveCourseDto {
    @IsNotEmpty()
    @IsCustomUUID()
    @IsCourseExist()
    courseUUID: string
}

export class UpdateCourseDto {

    @IsNotEmpty()
    @IsCustomUUID()
    @IsCourseExist()
    courseUUID: string;

    @IsOptional()
    @IsString()
    @Length(2, 100)
    courseName?: string;

    @IsOptional()
    @IsString()
    @Length(2, 1000)
    courseDescription: string;

    @IsOptional()
    subjectId: number;

    @IsOptional()
    @IsOptional()
    @IsArrayUnique()
    @IsCustomUUID({
        each: true,
    })
    persons: string[];

    @IsOptional()
    @IsOptional()
    @IsArrayUnique()
    @IsCustomUUID({
        each: true,
    })
    classes: string[];
}

