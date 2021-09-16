const mysql = require('mysql2');
import {
  Server,
  serverTable,
  classTable,
  timeTableEntryTable,
  subjectTable,
} from './server';

require('dotenv').config();
const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

connection.connect();

export async function getServerByGuildId(guild_id): Promise<serverTable[]> {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM `school` WHERE school_id IN (SELECT school_id FROM `discord_server` WHERE guild_id=?)',
      [guild_id],
      //@ts-ignore
      function (error, results, fields) {
        console.log(error);
        resolve(results);
      },
    );
  });
}

export async function getClassById(server_id): Promise<classTable[]> {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM `class` WHERE server_id=?',
      [server_id],
      //@ts-ignore
      function (error, results, fields) {
        resolve(results);
      },
    );
  });
}

export async function getSubjectById(subject_id): Promise<subjectTable[]> {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM `subject` WHERE subject_id=?',
      [subject_id],
      //@ts-ignore
      function (error, results, fields) {
        resolve(results);
      },
    );
  });
}

export async function getTimeTableEntriesByClassId(
  class_id,
): Promise<timeTableEntryTable[]> {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM `timetable_entry` WHERE class_id=? order by weekday asc, starttime asc',
      [class_id],
      //@ts-ignore
      function (error, results, fields) {
        resolve(results);
      },
    );
  });
}

export async function updateServer(server) {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE `server` set name=?, language=?, timezone=? WHERE guild_id=?',
      [
        server.name,
        server.language,
        server.timezone,
        server.guild_id,
      ],
      //@ts-ignore
      function (error, results, fields) {
        resolve(results);
      },
    );
  });
}

export async function getServerIdByGuildId(guildId) {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT server_id FROM server WHERE guild_id=?',
      [guildId],
      //@ts-ignore
      function (error, results, fields) {
        resolve(results);
      },
    );
  });
}

export async function updateClass(schoolclass) {
  let checkTime = parseInt(schoolclass.checktime);
  let checkTimeString = checkTime + "";
  //@ts-ignore
  if (
    Number.isNaN(checkTime) ||
    checkTimeString.includes('<') ||
    checkTimeString.includes('>')
  ) {
    checkTime = 1;
  }
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE `class` set student_id=?, teacher_id=?, checktime=?, autocheck=?, notifications=? WHERE server_id=?',
      [
        schoolclass.student_id,
        schoolclass.teacher_id,
        checkTime,
        schoolclass.autocheck ? 1 : 0,
        schoolclass.notifications ? 1 : 0,
        schoolclass.server_id,
      ],
      //@ts-ignore
      function (error, results, fields) {
        resolve(results);
      },
    );
  });
}

export async function updateTimetableEntry(entry) {
  let subject_id = 0;
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE `timetable_entry` set weekday=?, starttime=?, endtime=?, channel_id=?,  subject_id=? WHERE class_id=?',
      [
        entry.weekday,
        entry.start_time,
        entry.end_time,
        entry.channel,
        subject_id,
        entry.class_id,
      ],
      //@ts-ignore
      function (error, results, fields) {
        console.log(error);
        resolve(results);
      },
    );
  });
}

export async function getSubjectIdOfClassId(class_id, subject_name) {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT subject_id FROM `subject` WHERE subject_id IN(SELECT subject_id FROM timetable_entry WHERE subject_name=?class_id=? AND)',
      [class_id, subject_name],
      //@ts-ignore
      function (error, results, fields) {
        resolve(results);
      },
    );
  });
}

export async function updateSubject(subject) {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE `subject` set subject_name?',
      [subject.name],
      //@ts-ignore
      function (error, results, fields) {
        resolve(results);
      },
    );
  });
}
