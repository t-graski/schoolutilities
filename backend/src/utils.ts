const mysql = require('mysql2');
import { Server, serverTable, classTable, timeTableEntryTable, subjectTable } from './server';

require('dotenv').config();
const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
});

connection.connect();

export async function getServerByGuildId(guild_id): Promise<serverTable[]> {    
    return new Promise(
        (resolve,reject) =>{
            connection.query(
                'SELECT * FROM `server` WHERE guild_id=?',
                [guild_id],
                //@ts-ignore
                function (error, results, fields) {
                    resolve(results);
                }
            );
    });
}

export async function getClassById(server_id): Promise<classTable[]> {
    return new Promise(
        (resolve,reject) =>{
            connection.query(
                'SELECT * FROM `class` WHERE server_id=?',
                [server_id],
                //@ts-ignore
                function (error, results, fields) {
                    resolve(results);
                }
            );
    });
}

export async function getSubjectById(subject_id): Promise<subjectTable[]> {
    return new Promise(
        (resolve,reject) =>{
            connection.query(
                'SELECT * FROM `subject` WHERE subject_id=?',
                [subject_id],
                //@ts-ignore
                function (error, results, fields) {
                    resolve(results);
                }
            );
    });   

}

export async function getTimeTableEntriesByClassId(class_id): Promise<timeTableEntryTable[]> {
    return new Promise(
        (resolve,reject) =>{
            connection.query(
                'SELECT * FROM `timetable_entry` WHERE class_id=? order by weekday asc, starttime asc',
                [class_id],
                //@ts-ignore
                function (error, results, fields) {
                    resolve(results);
                }
            );
    });    
}