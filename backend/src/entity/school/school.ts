import { Department } from "../department/department";
import { Language } from "../language/language";

export type School = {
    schoolUUID: string;
    schoolName: string;
    schoolDescription: string;
    schoolLanguage: Language;
    // schoolTimezone: Timezone;
    schoolCreationTimestamp: Date;
    // schoolCreator: User;
    schoolCanUpload: boolean;
    // courses: Course[];
    departments: Department[];
    // schoolJoinCodes: SchoolJoinCodes[];
    // schoolUsers: SchoolUsers[];
    // schoolRooms: SchoolRoom[];
    // schoolSubjects: SchoolSubject[];
    // schoolHolidays: SchoolHoliday[]; 
}

export class AddSchoolDTO {
    schoolName: string;
    schoolDescription: string;
    schoolLanguageId: number;
    schoolTimezone: string;
}

export class UpdateSchoolDTO {
    schoolUUID: string;
    schoolName: string;
    schoolDescription: string;
    schoolLanguageId: number;
    schoolTimezone: string;
}

export class DeleteSchoolDTO {
    schoolUUID: string;
}

export class GetSchoolDTO {
    schoolUUID: string;
}