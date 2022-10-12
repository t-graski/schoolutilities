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
    joinCode: string;
    joinCodeName?: string;
    joinCodeExpireTimestamp?: Date;
}

export class DeleteJoinCodeDTO {
    joinCode: string;
}

export class GetJoinCodeDTO {
    joinCode: string;
}