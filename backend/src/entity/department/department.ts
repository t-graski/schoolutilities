import { School } from "../school/school";
import { SchoolClass } from "../school-class/schoolClass";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IsCustomUUID } from "src/decorators/IsCustomUUID";
import { Exclude } from "class-transformer";

export class Department {
    @Exclude()
    departmentId: number;

    @Exclude()
    schoolId: number;

    departmentUUID: string;
    departmentName: string;
    departmentAbbreviation: string;
    school: School;
    departmentIsVisible: boolean;
    departmentChildsVisible: boolean;
    schoolClasses?: SchoolClass[];

    constructor(partial: Partial<Department>) {
        Object.assign(this, partial);
    }
}

export class AddDepartmentDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    departmentName: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    departmentAbbreviation?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsCustomUUID()
    schoolUUID: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    departmentIsVisible: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    departmentChildsVisible: boolean;

    @ApiProperty()
    @IsOptional()
    @IsString({ each: true })
    schoolClasses?: string[];
}

export class UpdateDepartmentDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsCustomUUID()
    departmentUUID: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    departmentName?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    departmentAbbreviation?: string;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    departmentIsVisible?: boolean;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    departmentChildsVisible?: boolean;

    @ApiProperty()
    @IsOptional()
    @IsString({ each: true })
    schoolClasses?: string[];
}

export class DeleteDepartmentDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsCustomUUID()
    departmentUUID: string;
}

export class GetDepartmentDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsCustomUUID()
    departmentUUID: string;
}

export class GetDepartmentsDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsCustomUUID()
    schoolUUID: string;
}