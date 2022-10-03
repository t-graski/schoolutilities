export type CourseFile = {
    courseFileUUID: string;
    courseFileName: string;
    courseFileUploadTimestamp: Date;
    courseFileSize: number;
    courseFileType: string;
}

export class AddCourseFileDTO {
    courseFileName: string;
}

export class UpdateCourseFileDTO {
    courseFileUUID: string;
    courseFileName: string;
}

export class DeleteCourseFileDTO {
    courseFileUUID: string;
}

export class GetCourseFileDTO {
    courseFileUUID: string;
}