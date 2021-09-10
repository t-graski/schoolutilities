export interface Server {
    guildId: string;
    name: string;
    studentId: string;
    teacherId: string;
    timeZone: string;
    language: string;
    checktime: number;
    autocheck: boolean;
    notifications: boolean;
    timeTable: {
        startTime: {
            hours: number;
            minutes: number;
        };
        endTime: {
            hours: number;
            minutes: number;
        };
        subject: string;
        channel: string;
    }[][];
}

export interface serverTable {
    server_id: number;
    guild_id: string;
    name: string;
    language: string;
    timezone: string;
}

export interface classTable {
    class_id: number;
    server_id: number;
    student_id: string;
    teacher_id: string;
    checktime: number;
    autocheck: number;
    notifications: number;
}

export interface timeTableEntryTable {
    timetable_entry_id: number;
    starttime: string;
    endtime: string;
    subject_id: number;
    channel_id: string;
    weekday: number;
    class_id: number;
}

export interface subjectTable {
    subject_id: number;
    subject_name: string;
}