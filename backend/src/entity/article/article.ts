import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IsCustomUUID } from "src/decorators/IsCustomUUID";
import { User } from "../user/user";

export class Article {
    @Exclude()
    articleId: number;

    @ApiProperty()
    articleUUID: string;

    @ApiProperty()
    articleHeadline: string;

    @ApiProperty()
    articleCatchPhrase: string;

    @ApiProperty()
    articleContent: string;

    @ApiProperty()
    articleType: number;

    @ApiProperty()
    articleIsPublic: boolean;

    @ApiProperty()
    articlePublishTimestamp: Date;

    @ApiProperty()
    articleCreationTimestamp: Date;

    @ApiProperty()
    creator: User;

    @ApiProperty()
    readingTime?: number;

    constructor(partial: Partial<Article>) {
        Object.assign(this, partial);
    }
}

export class AddArticleDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    articleHeadline: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    articleCatchPhrase: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    articleContent: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    articleType: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    articleIsPublic: boolean;
}

export class UpdateArticleDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsCustomUUID()
    articleUUID: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    articleHeadline: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    articleCatchPhrase: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    articleContent: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    articleType: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    articleIsPublic: boolean;
}

export class DeleteArticleDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsCustomUUID()
    articleUUID: string;
}

export class GetArticleDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsCustomUUID()
    articleUUID: string;
}