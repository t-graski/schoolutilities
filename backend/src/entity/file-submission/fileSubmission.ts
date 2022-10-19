import { CourseElement } from "../course-element/courseElement"

export type FileSubmission = {
    courseElement: CourseElement;
    // user: User;
    courseFileSubmissionFileName: string;
    courseFileSubmissionOriginalFileName: string;
    courseFileSubmissionFileSize: number;
    courseFileSubmissionFileType: string;
    courseFileSubmissionUploadTimestamp: Date;
    courseFileSubmissionIsSubmittedLate: boolean;
}

export class AddFileSubmissionDTO {
    elementUUID: string;
}

export class DeleteFileSubmissionDTO {
    elementUUID: string;
}

export class GetFileSubmissionDTO {
    elementUUID: string;
}
