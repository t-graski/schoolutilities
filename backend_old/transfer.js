const mysql = require('mysql');
const fs = require('fs');

require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
});

connection.connect();

let configData;

try {
    configData = require('./datastore/configs.json');
} catch (error) {
    configData = [];
}

// {
//     "guildId": "676831877025497108",
//     "name": "Tobii's Bot Zentrale",
//     "studentId": "676834000169599047",
//     "teacherId": "744270395779317790",
//     "timeZone": "gmt+1",
//     "language": "english",
//     "channel": "bot-config",
//     "checktime": 1,
//     "timeTable": {
//         "1": [
//             {
//                 "startTime": {
//                     "hours": 8,
//                     "minutes": 0
//                 },
//                 "endTime": {
//                     "hours": 8,
//                     "minutes": 50
//                 },
//                 "subject": "abc",
//                 "channel": "836225721252839425"
//             }
//         ],
//         "2": [],
//         "3": [],
//         "4": [],
//         "5": [],
//         "6": [],
//         "7": []
//     },
//     "autocheck": true,
//     "notifications": true,
//     "prefix": "."
// }

async function test (){
for (let i = 0; i < configData.length; i++) {
    const config = configData[i];
    let server = await addServer({
        guild_id: config.guildId,
        name: config.name,
        language: config.language,
        timezone: config.timeZone,
    });
    let serverId = server.insertId;
    let schoolclass = await addClass({
        server_id: serverId,
        student_id: config.studentId,
        teacher_id: config.teacherId,
        checktime: config.checktime,
        autocheck: config.autocheck,
        notifications: config.notifications,
    });
    let classId = schoolclass.insertId;
    for (let weekday in config.timeTable) {
        let timeTable = config.timeTable[weekday];
        for (let time of timeTable) {
            await addTimetableEntry({
                class_id: classId,
                weekday: weekday,
                start_time: `${time.startTime.hours}:${time.startTime.minutes}`,
                end_time: `${time.endTime.hours}:${time.endTime.minutes}`,
                channel: time.channel,
                subject_name: time.subject,
            });
        }
    }
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 10);
    console.log(`${i+1}/${configData.length}`);
}
}
test();

async function addServer(server) {
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO `server` (guild_id, name, language, timezone) VALUES(?, ?, ?, ?)',
            [
                server.guild_id,
                server.name,
                server.language,
                server.timezone,
            ],
            //@ts-ignore
            function (error, results, fields) {
                resolve(results);
            }
        );
    });
}

async function addClass(schoolclass) {
    let checkTime = parseInt(schoolclass.checktime);
    if(Number.isNaN(checkTime) || checkTime + "".includes("<") || checkTime + "".includes(">")) {
        checkTime = 1;
    }
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO `class` (server_id, student_id, teacher_id, checktime, autocheck, notifications) VALUES(?, ?, ?, ?, ?, ?)',
            [
                schoolclass.server_id,
                schoolclass.student_id,
                schoolclass.teacher_id,
                checkTime,
                schoolclass.autocheck ? 1 : 0,
                schoolclass.notifications ? 1 : 0,
            ],
            //@ts-ignore
            function (error, results, fields) {
                resolve(results);
            }
        );
    });
}

async function addTimetableEntry(entry) {
    let subject_id = await getSubjectIdOfClassId(entry.class_id, entry.subject_name);
    if (subject_id.length === 0) {
        let subject = await addSubject({name: entry.subject_name});
        subject_id = subject.insertId;
    } else if(subject_id){
        subject_id = subject_id[0].subject_id;
    }
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO `timetable_entry` (weekday, starttime, endtime, channel_id, class_id, subject_id) VALUES(?, ?, ?, ?, ?, ?)',
            [
                entry.weekday,
                entry.start_time,
                entry.end_time,
                entry.channel,
                entry.class_id,
                subject_id,
            ],
            //@ts-ignore
            function (error, results, fields) {
                resolve(results);
            }
        );
    });
}

async function getSubjectIdOfClassId(class_id, subject_name) {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT subject_id FROM `timetable_entry` WHERE class_id = ? AND subject_id IN(SELECT subject_id FROM subject WHERE subject_name=?)',
            [class_id, subject_name],
            //@ts-ignore
            function (error, results, fields) {
                resolve(results);
            }
        );
    });
}

async function addSubject(subject){
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO `subject` (subject_name) VALUES(?)',
            [
                subject.name,
            ],
            //@ts-ignore
            function (error, results, fields) {
                resolve(results);
            }
        );
    });
}