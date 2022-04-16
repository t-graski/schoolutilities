// const mysql = require('mysql');
// const fs = require('fs');

// require('dotenv').config();

// const connection = mysql.createConnection({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_NAME,
// });

// connection.connect();

// let configData;

// try {
//     configData = require('./datastore/configs.json');
// } catch (error) {
//     configData = [];
// }

// // {
// //     "guildId": "676831877025497108",
// //     "name": "Tobii's Bot Zentrale",
// //     "studentId": "676834000169599047",
// //     "teacherId": "744270395779317790",
// //     "timeZone": "gmt+1",
// //     "language": "english",
// //     "channel": "bot-config",
// //     "checktime": 1,
// //     "timeTable": {
// //         "1": [
// //             {
// //                 "startTime": {
// //                     "hours": 8,
// //                     "minutes": 0
// //                 },
// //                 "endTime": {
// //                     "hours": 8,
// //                     "minutes": 50
// //                 },
// //                 "subject": "abc",
// //                 "channel": "836225721252839425"
// //             }
// //         ],
// //         "2": [],
// //         "3": [],
// //         "4": [],
// //         "5": [],
// //         "6": [],
// //         "7": []
// //     },
// //     "autocheck": true,
// //     "notifications": true,
// //     "prefix": "."
// // }

// async function test() {
//     for (let i = 0; i < configData.length; i++) {
//         const config = configData[i];
//         let school = await addSchool({
//             guild_id: config.guildId,
//             name: config.name,
//             language: config.language,
//             timezone: config.timeZone,
//         });
//         let schoolId = school.insertId;
//         await addDiscordServer({
//             school_id: schoolId,
//             guild_id: config.guildId,
//             server_name: config.name,
//         });
//         let schoolclass = await addClass({
//             server_id: schoolId,
//             student_id: config.studentId,
//             teacher_id: config.teacherId,
//             checktime: config.checktime,
//             autocheck: config.autocheck,
//             notifications: config.notifications,
//         });
//         let classId = schoolclass.insertId;
//         for (let weekday in config.timeTable) {
//             let timeTable = config.timeTable[weekday];
//             for (let timeTableEntryJson of timeTable) {
//                 let timeTableEntry = await addTimetableEntry({
//                     class_id: classId,
//                     weekday: weekday,
//                     start_time: `${timeTableEntryJson.startTime.hours}:${timeTableEntryJson.startTime.minutes}`,
//                     end_time: `${timeTableEntryJson.endTime.hours}:${timeTableEntryJson.endTime.minutes}`,
//                     channel: timeTableEntryJson.channel,
//                     subject_name: timeTableEntryJson.subject,
//                 });
//                 let timeTableEntryId = timeTableEntry.insertId;
//                 await addDiscordTimetableEntry({
//                     timetable_entry_id: timeTableEntryId,
//                     channel_id: timeTableEntryJson.channel,
//                 });
//             }
//         }
//         // Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 10);
//         console.log(`${i + 1}/${configData.length} (${Math.round(((i + 1) / configData.length) * 10000) / 100}%)`);
//     }
// }
// test();

// async function test2() {
//     let returnValue = await getSubjectIdOfClassId(5, 'Mathematik');
//     console.log(returnValue);
// }
// // test2();

// async function addSchool(server) {
//     return new Promise((resolve, reject) => {
//         connection.query(
//             'INSERT INTO `school` (name, language, timezone) VALUES(?, ?, ?)',
//             [server.name, server.language, server.timezone],
//             //@ts-ignore
//             function (error, results, fields) {
//                 resolve(results);
//             }
//         );
//     });
// }

// async function addDiscordServer(server) {
//     return new Promise((resolve, reject) => {
//         connection.query(
//             'INSERT INTO `discord_server` (school_id, guild_id, server_name) VALUES(?, ?, ?)',
//             [server.school_id, server.guild_id, server.server_name],
//             //@ts-ignore
//             function (error, results, fields) {
//                 resolve(results);
//             }
//         );
//     });
// }

// async function addClass(schoolclass) {
//     let checkTime = parseInt(schoolclass.checktime);
//     if (Number.isNaN(checkTime) || checkTime + ''.includes('<') || checkTime + ''.includes('>')) {
//         checkTime = 1;
//     }
//     return new Promise((resolve, reject) => {
//         connection.query(
//             'INSERT INTO `class` (school_id, student_id, teacher_id, checktime, autocheck, notifications) VALUES(?, ?, ?, ?, ?, ?)',
//             [
//                 schoolclass.server_id,
//                 schoolclass.student_id,
//                 schoolclass.teacher_id,
//                 checkTime,
//                 schoolclass.autocheck ? 1 : 0,
//                 schoolclass.notifications ? 1 : 0,
//             ],
//             //@ts-ignore
//             function (error, results, fields) {
//                 resolve(results);
//             }
//         );
//     });
// }

// async function addTimetableEntry(entry) {
//     let subject_id;
//     let subjectInDatabase = await getSubjectIdOfClassId(entry.class_id, entry.subject_name);
//     if (subjectInDatabase && subjectInDatabase.length === 0) {
//         let subject = await addSubject({ name: entry.subject_name, class_id: entry.class_id });
//         subject_id = subject.insertId;
//     } else {
//         subject_id = subjectInDatabase[0].subject_id;
//     }
//     return new Promise((resolve, reject) => {
//         connection.query(
//             'INSERT INTO `timetable_entry` (weekday, starttime, endtime, class_id, subject_id) VALUES(?, ?, ?, ?, ?)',
//             [entry.weekday, entry.start_time, entry.end_time, entry.class_id, subject_id],
//             //@ts-ignore
//             function (error, results, fields) {
//                 resolve(results);
//             }
//         );
//     });
// }

// async function getSubjectIdOfClassId(class_id, subject_name) {
//     let subjectTrimmed = subject_name.trim();
//     return new Promise((resolve, reject) => {
//         connection.query(
//             'SELECT * FROM `subject` WHERE class_id=? AND subject_name like ?',
//             [class_id, subjectTrimmed],
//             //@ts-ignore
//             function (error, results, fields) {
//                 resolve(results);
//             }
//         );
//     });
// }

// async function addDiscordTimetableEntry(timetableEntryData) {
//     return new Promise((resolve, reject) => {
//         connection.query(
//             'INSERT INTO `discord_timetable_entry` (timetable_entry_id, channel_id) VALUES(?, ?)',
//             [timetableEntryData.timetable_entry_id, timetableEntryData.channel_id],
//             //@ts-ignore
//             function (error, results, fields) {
//                 resolve(results);
//             }
//         );
//     });
// }

// async function addSubject(subject) {
//     return new Promise((resolve, reject) => {
//         let subjectTrimmed = subject.name.trim();
//         connection.query(
//             'INSERT INTO `subject` (subject_name, class_id) VALUES(?, ?)',
//             [subjectTrimmed, subject.class_id],
//             //@ts-ignore
//             function (error, results, fields) {
//                 resolve(results);
//             }
//         );
//     });
// }
