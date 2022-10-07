import { School } from "../school/school";
import { SchoolClass } from "../school-class/schoolClass";

export type Department = {
    departmentUUID: string;
    departmentName: string;
    departmentAbbreviation: string;
    school: School;
    departmentIsVisible: boolean;
    departmentChildsVisible: boolean;
    schoolClasses?: SchoolClass[];
}

export class AddDepartmentDto {
    departmentName: string;
    departmentAbbreviation?: string;
    schoolUUID: string;
    departmentIsVisible: boolean;
    departmentChildsVisible: boolean;
    schoolClasses?: SchoolClass[];
}

export class UpdateDepartmentDto {
    departmentUUID: string;
    departmentName?: string;
    departmentAbbreviation?: string;
    departmentIsVisible?: boolean;
    departmentChildsVisible?: boolean;
    schoolClasses?: SchoolClass[];
}

export class DeleteDepartmentDto {
    departmentUUID: string;
}

export class GetDepartmentDto {
    departmentUUID: string;
}

export class GetDepartmentsDto {
    schoolUUID: string;
}