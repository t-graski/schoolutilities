import { TimeTableElement } from "src/dto/addTimeTable";
import { Article } from "../article/article";
import { CourseElement } from "../course-element/courseElement";
import { Course } from "../course/course";
import { FileSubmissionGrade } from "../file-submission-grade/fileSubmissionGrade";
import { FileSubmission } from "../file-submission/fileSubmission";
import { School } from "../school/school";
import { UserSetting } from "../user-setting/userSetting";
import { Exclude } from 'class-transformer';

export class User {
    @Exclude()
    userId: number;

    @Exclude()
    userPassword: string;

    userUUID: string;
    userFirstname: string;
    userLastname: string;
    userBirthDate: Date;
    userEmail: string;
    userEmailVerified: boolean;
    userCreationTimestamp: Date;
    userLastLoginTimestamp: Date;
    articles?: Article[];
    courseElements?: CourseElement[];
    fileSubmissionGrades?: FileSubmissionGrade[];
    fileSubmissions?: FileSubmission[];
    courses?: Course[];
    schools?: School[];
    userSettings?: UserSetting;
    // timeTableTeachers: TimeTableTeacher[];
    timeTableElements?: TimeTableElement[];

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}