export type Article = {
    articleUUID: string;
    articleHeadline: string;
    articleCatchPhrase: string;
    articleContent: string;
    articleType: number;
    articleIsPublic: boolean;
    articlePublishTimestamp: Date;
    articleCreationTimestamp: Date;
    // creator: User;
}

export class AddArticleDTO {
    articleHeadline: string;
    articleCatchPhrase: string;
    articleContent: string;
    articleType: number;
    articleIsPublic: boolean;
}

export class UpdateArticleDTO {
    articleUUID: string;
    articleHeadline: string;
    articleCatchPhrase: string;
    articleContent: string;
    articleType: number;
    articleIsPublic: boolean;
}

export class DeleteArticleDTO {
    articleUUID: string;
}

export class GetArticleDTO {
    articleUUID: string;
}