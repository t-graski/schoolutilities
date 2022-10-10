export class SchoolSubject {
    schoolSubjectUUID: string;
    schoolSubjectName: string;
    schoolSubjectAbbreviation: string;
    // courses?: SchoolCourse[];
    // timeTableElements: TimeTableElement[]
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