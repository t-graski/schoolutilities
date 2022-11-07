import { Article } from "../article/article";
import { CourseElement } from "../course-element/courseElement";
import { Course } from "../course/course";
import { FileSubmissionGrade } from "../file-submission-grade/fileSubmissionGrade";
import { FileSubmission } from "../file-submission/fileSubmission";
import { School } from "../school/school";
import { UserSetting } from "../user-setting/userSetting";
import { Exclude } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";
import { TimeTableElement } from "../time-table-element/timeTableElement";

export class User {
    @Exclude()
    userId: number;

    @Exclude()
    userPassword: string;

    @ApiProperty()
    userUUID: string;

    @ApiProperty()
    userFirstname: string;

    @ApiProperty()
    userLastname: string;

    @ApiProperty()
    userBirthDate: Date;

    @ApiProperty()
    userEmail: string;

    @ApiProperty()
    userEmailVerified: boolean;

    @ApiProperty()
    userCreationTimestamp: Date;

    @ApiProperty()
    userLastLoginTimestamp: Date;

    @ApiProperty()
    articles?: Article[];

    @ApiProperty()
    courseElements?: CourseElement[];

    @ApiProperty()
    fileSubmissionGrades?: FileSubmissionGrade[];

    @ApiProperty()
    fileSubmissions?: FileSubmission[];

    @ApiProperty()
    courses?: Course[];

    @ApiProperty()
    schools?: School[];

    @ApiProperty()
    userSettings?: UserSetting;


    // timeTableTeachers: TimeTableTeacher[];

    @ApiProperty()
    timeTableElements?: TimeTableElement[];

    @ApiProperty()
    schoolRoleName?: string;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}