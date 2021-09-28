const mysql = require('mysql2');
import {
  Server,
  serverTable,
  classTable,
  timeTableEntryTable,
  subjectTable,
} from './server';
import { RegisterUserData } from './types/User';

require('dotenv').config();
const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

connection.connect();

export async function registerUser(
  userData: RegisterUserData,
): Promise<serverTable[]> {
  return new Promise((resolve, reject) => {
    connection.query(
      'insert into `persons` set firstname=?, lastname=?, email=?, password=?, birthdate=?',
      [
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.password,
        userData.birthDate,
      ],
      function (error, results, fields) {
        resolve(results);
      },
    );
  });
}
