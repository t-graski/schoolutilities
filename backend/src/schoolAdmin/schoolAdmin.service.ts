import { HttpStatus, Injectable } from '@nestjs/common';
import { regex } from 'src/regex';
import { DatabaseUpdate } from 'src/types/Database';
import {
  AddSchoolConfig,
  AddSchoolConfigReturnValue,
} from 'src/types/SchoolAdmin';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('mysql2');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class SchoolAdminService {
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

  async addSchoolConfig(
    body: AddSchoolConfig,
  ): Promise<AddSchoolConfigReturnValue> {
    const { name, languageId, timezone } = body;
    if (!regex.name.test(name) || !regex.timezone.test(timezone)) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid input',
      };
    }
    const schoolInsertData = await this.insertSchoolConfig(
      name,
      languageId,
      timezone,
    );
    if (schoolInsertData.affectedRows === 1) {
      return {
        status: HttpStatus.OK,
        message: 'School added successfully',
        data: { schoolId: schoolInsertData.insertId },
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'School not added',
      };
    }
  }

  insertSchoolConfig(name, languageId, timezone): Promise<DatabaseUpdate> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `INSERT INTO school (name, language_id, timezone) VALUES (?, ?, ?)`,
        [name, languageId, timezone],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        },
      );
    });
  }
}
