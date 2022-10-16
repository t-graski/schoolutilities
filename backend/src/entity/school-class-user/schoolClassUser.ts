import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AddSchoolClassUserDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    schoolClassUUID: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString({ each: true })
    users: string[];
}

export class DeleteSchoolClassUserDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    schoolClassUUID: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString({ each: true })
    users: string[];
}