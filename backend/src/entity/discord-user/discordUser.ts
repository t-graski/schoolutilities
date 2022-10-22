import { Exclude } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { User } from "../user/user";

export class DiscordUser {
    discordUserId: string;

    discordUserChannelId: string;

    discordGuildChannelId: string;

    discordGuildId: string;

    @Exclude()
    userId: number;

    users: User;

    constructor(partial: Partial<DiscordUser>) {
        Object.assign(this, partial);
    }
}

export class ConnectDiscordDTO {
    @IsNotEmpty()
    @IsString()
    discordUserId: string;

    @IsNotEmpty()
    @IsString()
    discordUserChannelId: string;

    @IsNotEmpty()
    @IsString()
    discordGuildChannelId: string;

    @IsNotEmpty()
    @IsString()
    discordGuildId: string;
}

export class DisconnectDiscordDTO {
    @IsNotEmpty()
    @IsString()
    userUUID: string;
}