import { Exclude, Expose } from "class-transformer";

import { Course } from "./course.entity";

export class User {
    personUUID: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    email: string;
    creationDate: Date;
    lastLogin: Date;
    courses: Course[];
    roles: string[];

    @Exclude()
    password: string;

    @Exclude()
    emailVerified: boolean;

    @Expose()
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}