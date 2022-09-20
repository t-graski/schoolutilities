import { Class } from "./class.entity";
import { Exclude } from "class-transformer";
import { User } from "./user.entity";

export class Course {
    courseUUID: string;
    name: string;
    courseDescription: string;
    creationDate: Date;
    classes: Class[];
    users: User[];


    @Exclude()
    personCreationId: number;
}