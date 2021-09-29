const mysql = require('mysql2');
import { async } from 'rxjs';
import {
  Server,
  serverTable,
  classTable,
  timeTableEntryTable,
  subjectTable,
  User,
} from './server';
import { LoginUserData, RegisterUserData } from './types/User';

require('dotenv').config();
const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

connection.connect();

export async function registerUser(userData: RegisterUserData): Promise<any> {
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

export async function getUserData(userData: LoginUserData): Promise<User[]> {
  return new Promise((resolve, reject) => {
    connection.query(
      'select * from `persons` where email=? ',
      [userData.email],
      function (error, results, fields) {
        resolve(results);
      },
    );
  });
}

export async function insertToken(userId: number, token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    connection.query(
      'insert into `login_tokens` set person_id=?, expire_date=ADDTIME(now(), "06:00:00"), token=?',
      [userId, token],
      function (error, results, fields) {
        resolve(results);
      },
    );
  });
}

export async function insertRegisterToken(userId, token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    connection.query(
      'insert into `register_tokens` set person_id=?, token=?',
      [userId, token],
      function (error, results, fields) {
        resolve(results);
      },
    );
  });
}

export async function getUserByEmail(email: string): Promise<serverTable[]> {
  return new Promise((resolve, reject) => {
    connection.query(
      'select * from `persons` where email=?',
      [email],
      function (error, results, fields) {
        resolve(results);
      },
    );
  });
}
