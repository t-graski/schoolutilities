const mysql = require('mysql2');
// import {
//   Server,
//   serverTable,
//   classTable,
//   timeTableEntryTable,
//   subjectTable,
// } from './server';

require('dotenv').config();
const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

connection.connect();

export async function getServerIdByGuildId(guildId): Promise<number[]> {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT school_id FROM school WHERE school_id IN (SELECT school_id FROM discord_server WHERE guild_id=?)',
      [guildId],
      //@ts-ignore
      function (error, results, fields) {
        resolve(results);
      },
    );
  });
}