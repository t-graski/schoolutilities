import { Exclude } from "class-transformer";
import { Department } from "../department/department";

export class SchoolClass {
    @Exclude()
    schoolClassId: number;

    @Exclude()
    schoolClassDepartmentId: number;
    schoolClassUUID: string;
    schoolClassName: string;
    schoolClassDepartment: Department;
    // courseClasses?: courseClasses;
    // timeTableElementClasses?: timeTableElementClasses;
    // timeTableEventClasses?: timeTableEventClasses;
    // timeTableSubstitutionClasses?: timeTableSubstitutionClasses;

    constructor(partial: Partial<SchoolClass>) {
        Object.assign(this, partial);
    }
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