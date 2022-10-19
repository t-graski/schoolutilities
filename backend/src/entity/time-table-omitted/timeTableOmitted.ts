import { TimeTableElement } from "../time-table-element/timeTableElement";

export type TimeTableOmitted = {
    timeTableOmittedReason: string;
    timeTableOmittedDate: Date;
    timeTableElement: TimeTableElement;
}

export class AddTimeTableOmittedDTO {
    timeTableElementUUID: string;
    timeTableOmittedReason: string;
    timeTableOmittedDate: Date;
}

export class UpdateTimeTableOmittedDTO {
    timeTableElementUUID: string;
    timeTableOmittedReason?: string;
    timeTableOmittedDate?: Date;
}

export class DeleteTimeTableOmittedDTO {
    timeTableElementUUID: string;
    timeTableOmittedDate: Date;
}

export class GetTimeTableOmittedDTO {
    timeTableElementUUID: string;
    timeTableOmittedDate?: Date;
}
