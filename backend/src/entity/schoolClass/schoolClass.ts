import { Department } from "../department/department";

export type SchoolClass = {
    schoolClassUUID: string;
    schoolClassName: string;
    schoolClassDepartment: Department;
    // courseClasses?: courseClasses;
    // timeTableElementClasses?: timeTableElementClasses;
    // timeTableEventClasses?: timeTableEventClasses;
    // timeTableSubstitutionClasses?: timeTableSubstitutionClasses;
}

export class AddSchoolClassDto {
    schoolClassName: string;
    schoolClassDepartmentUUID: string;
}

export class UpdateSchoolClassDto {
    schoolClassUUID: string;
    schoolClassName?: string;
    schoolClassDepartmentUUID?: string;
}

export class DeleteSchoolClassDto {
    schoolClassUUID: string;
}

export class GetSchoolClassDto {
    schoolClassUUID: string;
}