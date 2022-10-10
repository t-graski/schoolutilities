export class Language {
    languageUUID: string;
    languageName: string;
    languageTag: string;
}

export class AddLanguageDto {
    languageName: string;
    languageTag: string;
}

export class UpdateLanguageDto {
    languageUUID: string;
    languageName?: string;
    languageTag?: string;
}

export class DeleteLanguageDto {
    languageUUID: string;
}

export class GetLanguageDto {
    languageUUID: string;
}