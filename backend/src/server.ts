import { Timestamp } from "rxjs";

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
  classTimeTable?: {
      classId: number;
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

export interface UserServerInfo {
  id: string;
  name: string;
  icon: string;
  owner: string;
  permissions: string;
  features: string[];
  permissions_new: string;
}

export interface UserServerInfoList {
    sharedAdminServer: UserServerInfo[],
    sharedServer: UserServerInfo[],
    adminServer: UserServerInfo[],
}

export interface User {
  person_id: number,
  firstname: string,
  lastname: string,
  birthdate: Date,
  school_id: number,
  class_id: number,
  email: string, 
  password: string,
  email_verified: number,
  creation_date: Date
}