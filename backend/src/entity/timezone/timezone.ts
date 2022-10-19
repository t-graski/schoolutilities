export type Timezone = {
    timezoneUUID: string;
    timezoneName: string;
}


export class AddTimezoneDTO {
    timezoneName: string;
}

export class UpdateTimezoneDTO {
    timezoneUUID: string;
    timezoneName: string;
}

export class DeleteTimezoneDTO {
    timezoneUUID: string;
}

export class GetTimezoneDTO {
    timezoneUUID: string;
}
