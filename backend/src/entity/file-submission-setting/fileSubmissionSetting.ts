export type FileSubmissionSetting = {
    fileSubmissionName: string;
    fileSubmissionDescription: string;
    fileSubmissionDueTimestamp: Date;
    fileSubmissionSubmitLater: boolean;
    fileSubmissionSubmitLaterTimestamp: Date;
    fileSubmissionMaxFileSize: GLfloat;
    fileSubmissionAllowedFileTypes: string;
    // courseElement?: CourseElement; 
}

export class AddFileSubmissionSettingDTO {
    elementUUID: string;
    fileSubmissionName: string;
    fileSubmissionDescription: string;
    fileSubmissionDueTimestamp: Date;
    fileSubmissionSubmitLater: boolean;
    fileSubmissionSubmitLaterTimestamp: Date;
    fileSubmissionMaxFileSize: GLfloat;
    fileSubmissionAllowedFileTypes: string;
}

export class UpdateFileSubmissionSettingDTO {
    elementUUID: string;
    fileSubmissionName: string;
    fileSubmissionDescription: string;
    fileSubmissionDueTimestamp: Date;
    fileSubmissionSubmitLater: boolean;
    fileSubmissionSubmitLaterTimestamp: Date;
    fileSubmissionMaxFileSize: GLfloat;
    fileSubmissionAllowedFileTypes: string;
}

export class DeleteFileSubmissionSettingDTO {
    elementUUID: string;
}

export class GetFileSubmissionSettingDTO {
    elementUUID: string;
}