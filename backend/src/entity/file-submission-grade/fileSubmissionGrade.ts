export class FileSubmissionGrade {
    fileSubmissionGrade: number;
    fileSubmissionNotes: string;
    // courseElement?: CourseElement;
    // creator: User;
    courseFileSubmissionGradeCreationTimestamp: Date;
}

export class AddFileSubmissionGradeDTO {
    elementUUID: string;
    fileSubmissionGrade: number;
    fileSubmissionNotes: string;
}

export class UpdateFileSubmissionGradeDTO {
    elementUUID: string;
    fileSubmissionGrade: number;
    fileSubmissionNotes: string;
}

export class DeleteFileSubmissionGradeDTO {
    elementUUID: string;
}

export class GetFileSubmissionGradeDTO {
    elementUUID: string;
}