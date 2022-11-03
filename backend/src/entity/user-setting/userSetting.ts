export class UserSetting {
    // user: User;
    userSettingLanguageId: number;
    userSettingTimezone: string;
    userSettingDateTimeFormat: string;
    userSettingReceiveUpdateEmails: boolean;
    userSettingAvatarUUID: string;
    userSettingPhoneNumber: string;
    userSettingThemeMode: string;
    userSettingTheme: string;
}

export class UpdateUserSettingDTO {
    userUUID: string;
    userSettingLanguageId: number;
    userSettingTimezone: string;
    userSettingDateTimeFormat: string;
    userSettingReceiveUpdateEmails: boolean;
    userSettingAvatarUUID: string;
    userSettingPhoneNumber: string;
    userSettingThemeMode: string;
    userSettingTheme: string;
}

export class GetUserSettingDTO {
    userUUID: string;
}