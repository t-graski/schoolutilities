export type UserLoginToken = {
    // user: User;
    refreshToken: string;
    userLoginTokenCreationTimestamp: number;
    userLoginTokenExpireTimestamp: number;
}

export class GetUSerLoginTokenDTO {
    userUUID: string;
}