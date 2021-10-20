import { HttpStatus, Injectable } from '@nestjs/common';
import { regex } from 'src/regex';
import { DatabaseUpdate } from 'src/types/Database';
import { AddCourse, AddCourseReturnValue } from 'src/types/Course'
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
    const { name, courseDescription, schoolId, subjectId, classId } = body;
    if (!regex.title.test(name)) {
      return {
        status: HttpStatus.NOT_ACCEPTABLE,
        message: 'Invalid input',
      };
    }
    const courseInsertData = await this.insertCourse(
      name,
      courseDescription,
      schoolId,
      subjectId,
      classId,
    );
    if (courseInsertData.affectedRows === 1) {
      return {
        status: HttpStatus.OK,
        message: 'Course added successfully',
        data: { courseId: courseInsertData.insertId },
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Course not added',
      };
    }
  }
  insertCourse(
    name,
    courseDescription,
    schoolId,
    subjectId,
    classId,
  ): Promise<DatabaseUpdate> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `insert into course (name, course_description, school_id, subject_id, class_id) values (?, ?, ?, ?, ?)`,
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
