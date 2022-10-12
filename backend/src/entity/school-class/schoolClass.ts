import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { Department } from "../department/department";

export class SchoolClass {
    @Exclude()
    schoolClassId: number;

    @Exclude()
    schoolClassDepartmentId: number;
    schoolClassUUID: string;
    schoolClassName: string;
    departments: Department;
    // courseClasses?: courseClasses;
    // timeTableElementClasses?: timeTableElementClasses;
    // timeTableEventClasses?: timeTableEventClasses;
    // timeTableSubstitutionClasses?: timeTableSubstitutionClasses;

    constructor(partial: Partial<SchoolClass>) {
        Object.assign(this, partial);
    }
}

export class AddSchoolClassDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    schoolClassName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    schoolClassDepartmentUUID: string;
}

export class UpdateSchoolClassDTO {
    schoolClassUUID: string;
    schoolClassName?: string;
    schoolClassDepartmentUUID?: string;
}

export class DeleteSchoolClassDTO {
    schoolClassUUID: string;
}

export class GetSchoolClassDTO {
    schoolClassUUID: string;
}