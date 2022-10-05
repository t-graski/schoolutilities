import { User } from "../user/user";
import { Course } from "../course/course";
import { Exclude, Type, Expose } from 'class-transformer';

export class CourseUser {
    @Exclude()
    courseId: number;

    @Exclude()
    userId: number;

    @Expose()
    @Type(() => Course)
    courses: Course;

    @Expose()
    @Type(() => User)
    users: User;

    constructor(partial: Partial<CourseUser>) {
        Object.assign(this, partial);
    }
}