export type CourseElement = {
    courseElementUUID: string;
    courseElementTypeId: number;
    courseElementParent: CourseElement;
    courseElementIsVisible: boolean;
    courseElementWeight: number;
    courseElementOrder: number;
    // creator: User;
    courseElementCreationTimestamp: Date;
    // courseFileSubmissionSettings: CourseFileSubmissionSetting[];
    // courseElementHeadlineSettings: CourseElementHeadlineSetting[];
    // courseElementTextSettings: CourseElementTextSetting[];
    // courseFileSubmissions: CourseFileSubmission[];
}

export class AddCourseElementDTO {
    courseElementTypeId: number;
    courseElementIsVisible: boolean;
    courseElementWeight: number;
}

export class UpdateCourseElementDTO {
    courseElementUUID: string;
    courseElementIsVisible: boolean;
    courseElementWeight: number;
}

export class DeleteCourseElementDTO {
    courseElementUUID: string;
}

export class GetCourseElementDTO {
    courseElementUUID: string;
}