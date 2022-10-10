import { School } from "../school/school";

export class JoinCode {
    joinCode: string;
    joinCodeName?: string;
    joinCodeExpireTimestamp?: Date;
    // creator: User;
    joinCodeCreationTimestamp: Date;
    school: School;
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