import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { School } from "../school/school";
import { User } from "../user/user";

export class JoinCode {
    schoolJoinCode: string;
    schoolJoinCodeName?: string;
    schoolJoinCodeExpireTimestamp?: Date;
    creator: User;
    schoolJoinCodeCreationTimestamp: Date;
    school: School;

    constructor(partial: Partial<JoinCode>) {
        Object.assign(this, partial);
    }
}

export class AddJoinCodeDTO {
    schoolUUID: string;
    joinCodeName?: string;
    joinCodeExpireTimestamp?: Date;
}

export class UpdateJoinCodeDTO {
    schoolJoinCode: string;
    joinCodeName?: string;
    joinCodeExpireTimestamp?: Date;
}

export class DeleteJoinCodeDTO {
    joinCode: string;
}

export class GetJoinCodeDTO {
    joinCode: string;
}

export class JoinSchoolDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    joinCode: string;
}

export class LeaveSchoolDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    schoolUUID: string;
}