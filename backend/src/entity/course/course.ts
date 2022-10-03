import { School } from "../school/school";

export type Course = {
    courseUUID: string;
    courseName: string;
    courseDescription: string;
    school: School;
    // schoolSubject: SchoolSubject;
    courseCreationTimestamp: Date;
    // creator: User;
    // courseClasses: CourseClasses[];
    // courseElements: CourseElement[];
    // courseFileSubmmissionGrades: CourseFileSubmissionGrade[];
}

export class AddCourseDTO {
    courseName: string;
    courseDescription: string;
    schoolUUID: string;
    schoolSubjectUUID: string;
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