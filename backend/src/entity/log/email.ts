import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { User } from "../user/user";

export class LogEmail {
    logEmailUUID: string;
    user: User;
    logEmailTimestamp: Date;
    logEmailSubject: string;
    logEmailReceiver: string;

    constructor(partial: Partial<LogEmail>) {
        Object.assign(this, partial);
    }
}

export class GetLogEmailDTO {
    @ApiProperty({
        description: "The email of a user",
        type: String,
    })
    @IsNotEmpty()
    @IsEmail()
    userEmail: string;
}