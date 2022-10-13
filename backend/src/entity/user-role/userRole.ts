import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { SchoolRole } from "../school-role/schoolRole";
import { School } from "../school/school";

export class UserRole {
    @Exclude()
    userId: number;

    @Exclude()
    schoolRoleId: number;

    @Exclude()
    schoolId: number;

    schools?: School;
    schoolRoles?: SchoolRole;

    constructor(partial: Partial<UserRole>) {
        Object.assign(this, partial);
    }
}

export class UpdateRoleDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userUUID: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    schoolUUID: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    roleId: number;
}