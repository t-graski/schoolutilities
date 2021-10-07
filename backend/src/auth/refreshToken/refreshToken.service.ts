import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { nanoid } from 'nanoid';
import { DatabaseService } from 'src/database/database.service';
import { MailService } from 'src/mail/mail.service';
import { DatabaseUpdate } from 'src/types/Database';
import { LoginUserData, RegisterUserData } from 'src/types/User';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('mysql2');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class RefreshTokenService {
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
  async getTokenData(refreshToken: string, personId): Promise<DatabaseUpdate> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'select ´refresh_token from `login_tokens` where refresh_token=? and person_id=?',
        [refreshToken, personId],
        function (error, results, fields) {
          resolve(results);
        },
      );
    });
  }

  async insertRefreshToken(
    refreshToken: string,
    personId: string,
  ): Promise<DatabaseUpdate> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'insert into `login_tokens` set person_id=?, refresh_token=?',
        [personId, refreshToken],
        function (error, results, fields) {
          resolve(results);
        },
      );
    });
  }

  async deleteRefreshToken(refreshToken: string): Promise<DatabaseUpdate> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'delete from `login_tokens` where refresh_token=?',
        [refreshToken],
        function (error, results, fields) {
          resolve(results);
        },
      );
    });
  }
}
