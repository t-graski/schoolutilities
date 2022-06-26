import { IsDate, IsInt, IsNotEmpty, IsOptional, Length } from "class-validator";
import { IsCustomUUID } from "src/decorators/IsCustomUUID";

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


