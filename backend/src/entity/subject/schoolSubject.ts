import { TimeTableElement } from "src/dto/addTimeTable";
import { Course } from "../course/course";

export class SchoolSubject {
    schoolSubjectUUID: string;
    schoolSubjectName: string;
    schoolSubjectAbbreviation: string;
    courses?: Course[];
    timeTableElements?: TimeTableElement[]
}

export class AddSchoolSubjectDTO {
    schoolUUID: string;
    schoolSubjectName: string;
    schoolSubjectAbbreviation: string;
}

export class UpdateSchoolSubjectDTO {
    schoolSubjectUUID: string;
    schoolSubjectName: string;
    schoolSubjectAbbreviation: string;
}


export class DeleteSchoolSubjectDTO {
    schoolSubjectUUID: string;
}

export class GetSchoolSubjectDTO {
    schoolSubjectUUID: string;
}