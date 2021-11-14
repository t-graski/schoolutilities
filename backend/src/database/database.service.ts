// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('mysql2');
import { Injectable } from '@nestjs/common';
import { serverTable, User } from 'src/server';
import { DatabaseUpdate } from 'src/types/Database';
import { LoginUserData, RegisterUserData } from 'src/types/User';

require('dotenv').config();

@Injectable()
export class DatabaseService {
  connection: any;
  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });

    this.connection.connect();
  }

  async registerUser(userData: RegisterUserData): Promise<DatabaseUpdate> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'insert into `persons` set firstname=?, lastname=?, email=?, password=?, birthdate=?',
        [
          userData.firstName,
          userData.lastName,
          userData.email,
          userData.password,
          userData.birthDate,
        ],
        function (error, results, fields) {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        },
      );
    });
  }

  async getUserData(userData: LoginUserData): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'select * from `persons` where email=? ',
        [userData.email],
        function (error, results, fields) {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        },
      );
    });
  }

  async getUserDataById(userId: number): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'select * from `persons` where person_id=? ',
        [userId],
        function (error, results, fields) {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        },
      );
    });
  }

  async insertToken(userId: number, token: string): Promise<DatabaseUpdate> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'insert into `login_tokens` set person_id=?, expire_date=ADDTIME(now(), "06:00:00"), token=?',
        [userId, token],
        function (error, results, fields) {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        },
      );
    });
  }

  async insertRegisterToken(userId, token: string): Promise<DatabaseUpdate> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'insert into `register_tokens` set person_id=?, token=?',
        [userId, token],
        function (error, results, fields) {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        },
      );
    });
  }

  async getUnverifiedUserByRegisterToken(token: string): Promise<number[]> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'select person_id from `persons` where person_id IN(select person_id from `register_tokens` where token=?) and email_verified=0',
        [token],
        function (error, results, fields) {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        },
      );
    });
  }

  async deleteRegisterToken(token: string): Promise<DatabaseUpdate> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'delete from `register_tokens` where token=?',
        [token],
        function (error, results, fields) {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        },
      );
    });
  }

  async activateAccount(token: string): Promise<DatabaseUpdate> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'update `persons` set email_verified=1 where person_id IN (select person_id from `register_tokens` where token=?)',
        [token],
        function (error, results, fields) {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        },
      );
    });
  }
}
