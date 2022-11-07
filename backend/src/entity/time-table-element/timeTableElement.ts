import { SchoolRoom } from "../school-room/schoolRoom";
import { SchoolClass } from "../school-class/schoolClass";
import { SchoolSubject } from "../subject/schoolSubject";
import { Exclude, Expose, Transform } from "class-transformer";
import { Exam } from "../exam/exam";
import { User } from "../user/user";
import { Substitution } from "../substitution/substitution";
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class TimeTableElement {
    @Exclude()
    timeTableElementId: number;

    @Exclude()
    timeTableElementSubjectId: number;

    @Exclude()
    timeTableElementRoomId: number;

    @Exclude()
    timeTableElementCreatorId: number;

    @ApiProperty({
        description: "The uuid of a timetable element",
        type: String,
        example: "52ac9bf1-5b6d-4195-8182-069a1c4cfef3",
    })
    timeTableElementUUID: string;

    @ApiProperty({
        description: "The subject of a timetable element",
        type: () => SchoolSubject,
    })
    @Transform(({ value }) => new SchoolSubject(value))
    @Expose({ name: "timeTableElementSubject" })
    schoolSubjects: SchoolSubject;

    @ApiProperty({
        description: "The room of a timetable element",
        type: () => SchoolRoom,
    })
    @Transform(({ value }) => new SchoolRoom(value))
    @Expose({ name: "timeTableElementRoom" })
    schoolRoom?: SchoolRoom;

    @ApiProperty({
        description: "The start time of an element",
        type: Date,
        example: "2021-01-01T08:00:00.000Z",
    })
    timeTableElementStartTime: Date;

    @ApiProperty({
        description: "The end time of an element",
        type: Date,
        example: "2021-01-01T08:50:00.000Z",
    })
    timeTableElementEndTime: Date;

    @ApiProperty({
        description: "The day of an element",
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    })
    timeTableElementDay: string;

    @ApiProperty({
        description: "The creation timestamp of an element",
        type: Date,
        example: "2021-01-01T08:00:00.000Z",
    })
    timeTableElementCreationTimestamp: Date;

    @ApiProperty({
        description: "The creator of an element",
        type: () => User,
    })
    @Transform(({ value }) => new User(value))
    @Expose({ name: "timeTableElementCreator" })
    users: User;

    @ApiProperty({
        description: "The teachers of a timetable element",
        type: () => [User],
    })
    @Transform(({ value }) => value?.map((user) => new User(user.users)))
    @Expose({ name: "timeTableElementTeachers" })
    timeTableTeachers?: Record<string, any>;


    @ApiProperty({
        description: "The classes of a timetable element",
        type: () => [SchoolClass],
    })
    @Transform(({ value }) => value?.map((schoolClass) => new SchoolClass(schoolClass.schoolClasses)))
    @Expose({ name: "timeTableElementClasses" })
    timeTableElementClasses?: Record<string, any>;
    // timeTableEvents?: TimeTableEvent[];
    timeTableSubstitution?: Substitution[] | Substitution;
    // timeTableOmitted?: TimeTableOmitted[];
    timeTableExam?: Exam;

    constructor(partial: Partial<TimeTableElement>) {
        Object.assign(this, partial);
    }
}

export class AddTimeTableElementDTO {
    timeTableElementSubjectUUID: string;
    timeTableElementRoomUUID: string;
    timeTableElementStartTime: Date;
    timeTableElementEndTime: Date;
    timeTableElementDay: string;
    timeTableElementClasses?: string[];
    timeTableElementTeachers?: string[];
}

export class UpdateTimeTableElementDTO {
    @IsNotEmpty()
    timeTableElementUUID: string;
    @IsNotEmpty()
    timeTableElementSubjectUUID: string;
    @IsNotEmpty()
    timeTableElementRoomUUID: string;
    @IsNotEmpty()
    timeTableElementStartTime: Date;
    @IsNotEmpty()
    timeTableElementEndTime: Date;
    @IsNotEmpty()
    timeTableElementDay: string;
    @IsNotEmpty()
    timeTableElementClasses?: string[];
    @IsNotEmpty()
    timeTableElementTeachers?: string[];
}

export class DeleteTimeTableElementDTO {
    timeTableElementUUID: string;
}

export class GetTimeTableElementDTO {
    timeTableElementUUID: string;
}

