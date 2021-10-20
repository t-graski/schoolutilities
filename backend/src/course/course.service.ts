import { HttpStatus, Injectable } from '@nestjs/common';
import { regex } from 'src/regex';
import { DatabaseUpdate } from 'src/types/Database';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('mysql2');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class CourseService {
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
  async addCourse(body: AddCourse): Promise<AddCourseReturnValue> {
    const { name, languageId, timezone } = body;
    if (!regex.schoolName.test(name) || !regex.timezone.test(timezone)) {
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
  insertSchoolConfig(
    name,
    courseDescription,
    schoolId,
    subjectId,
    classId,
  ): Promise<DatabaseUpdate> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `insert into course (name, course_description, school_id, subject_id, class_id) values (?,?,?,?,?,?)`,
        [name, courseDescription, schoolId, subjectId, classId],
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
