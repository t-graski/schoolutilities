import { Exclude } from "class-transformer";

export class SchoolRole {
    @Exclude()
    schoolRoleId: number;
    schoolRoleName: string;

    constructor(partial: Partial<SchoolRole>) {
        Object.assign(this, partial);
    }
}
