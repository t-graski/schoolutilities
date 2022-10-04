import { User } from "../user/user";

export type EmailChangeToken = {
    user: User;
    emailChangeToken: string;
    emailChangeTokenNewEmail: string;
    emailChangeTokenVerified: boolean;
    emailChangeTokenCreationTimestamp: Date;
    emailChangeTokenExpireTimestamp: Date;
}

export class AddEmailChangeTokenDTO {
    userUUID: string;
    newEmail: string;
}

export class GetEmailChangeTokenDTO {
    userUUID: string;
}