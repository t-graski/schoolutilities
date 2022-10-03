import { IsNotEmpty, IsOptional } from "class-validator";
import { CourseElement } from "../course-element/courseElement";
import { FileSubmissionGrade } from "../file-submission-grade/fileSubmissionGrade";
import { School } from "../school/school";
import { SchoolClass } from "../schoolClass/schoolClass";
import { SchoolSubject } from "../subject/schoolSubject";
import { User } from "../user/user";

export type Course = {
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
}

export class AddCourseDTO {
    @IsNotEmpty()
    courseName: string;
    @IsNotEmpty()
    courseDescription: string;
    @IsNotEmpty()
    schoolUUID: string;
    @IsNotEmpty()
    schoolSubjectUUID: string;
    @IsOptional()
    users: string[];
    @IsOptional()
    classes: string[];
}

export class UpdateCourseDTO {
    courseUUID: string;
    courseName: string;
    courseDescription: string;
    schoolUUID: string;
    schoolSubjectUUID: string;
}

export class DeleteCourseDTO {
    courseUUID: string;
}

export class GetCourseDTO {
    courseUUID: string;
}