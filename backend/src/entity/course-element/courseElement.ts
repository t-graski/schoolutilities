import { FileSubmissionSetting } from "../file-submission-setting/fileSubmissionSetting";
import { FileSubmission } from "../file-submission/fileSubmission";
import { HeadlineSetting } from "../headline-setting/headlineSetting";
import { TextSetting } from "../text-setting/textSetting";
import { User } from "../user/user";

export class CourseElement {
    courseElementUUID: string;
    courseElementTypeId: number;
    courseElementParent: CourseElement;
    courseElementIsVisible: boolean;
    courseElementWeight: number;
    courseElementOrder: number;
    creator: User;
    courseElementCreationTimestamp: Date;
    courseFileSubmissionSettings?: FileSubmissionSetting[];
    courseElementHeadlineSettings?: HeadlineSetting[];
    courseElementTextSettings?: TextSetting[];
    courseFileSubmissions?: FileSubmission[];
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