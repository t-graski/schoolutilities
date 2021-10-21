import { HttpStatus, Injectable } from '@nestjs/common';
import { regex } from 'src/regex';
import { DatabaseUpdate } from 'src/types/Database';
import {
  AddCourse,
  AddCourseReturnValue,
  CourseTable,
  UpdateCourse,
  AddUser,
  AddUserReturnValue,
  CourseUser,
  RemoveUser,
} from 'src/types/Course';
import { ReturnMessage } from 'src/types/SchoolAdmin';
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

  async removeCourse(courseId: number): Promise<ReturnMessage> {
    const course = await this.getCourseById(courseId);
    if (course.length === 0) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Course not found',
      };
    }
    const deleteClass = await this.deleteCourse(courseId);
    if (deleteClass.affectedRows === 1) {
      return {
        status: HttpStatus.OK,
        message: 'Course deleted successfully',
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Course not deleted',
      };
    }
  }

  async updateCourse(body: UpdateCourse): Promise<ReturnMessage> {
    const { courseId, name, courseDescription, subjectId, classId } = body;
    if (!regex.title.test(name) && !regex.title.test(courseDescription)) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid input',
      };
    }
    const courseUpdateData = await this.patchCourse(
      courseId,
      name,
      courseDescription,
      subjectId,
      classId,
    );
    if (courseUpdateData.affectedRows === 1) {
      return {
        status: HttpStatus.OK,
        message: 'Course updated successfully',
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Course not updated',
      };
    }
  }

  async addUser(body: AddUser): Promise<AddUserReturnValue> {
    const { courseId, personId } = body;
    if ((await this.getUser(courseId, personId)).length === 1) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'User already exists',
      };
    }

    const courseUserInsertData = await this.insertUser(courseId, personId);
    if (courseUserInsertData.affectedRows === 1) {
      return {
        status: HttpStatus.OK,
        message: 'User added successfully',
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'User not added',
      };
    }
  }

  async removeUser(body: RemoveUser): Promise<ReturnMessage> {
    const { courseId, userId } = body;
    const userCourse = await this.getUser(courseId, userId);
    if (userCourse.length === 0) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'User not found',
      };
    }
    const deleteUserCourse = await this.deleteUserCourse(courseId, userId);
    if (deleteUserCourse.affectedRows === 1) {
      return {
        status: HttpStatus.OK,
        message: 'User deleted successfully',
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'User not deleted',
      };
    }
  }
  insertCourse(
    name,
    courseDescription = '',
    schoolId,
    subjectId = null,
    classId = null,
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

  insertUser(courseId, personId): Promise<DatabaseUpdate> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `insert into course_persons (course_id, person_id) values (?, ?)`,
        [courseId, personId],
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

  patchCourse(
    courseId,
    name,
    courseDescription,
    subjectId,
    classId,
  ): Promise<DatabaseUpdate> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `update course set name=?, course_description=?, subject_id=?, class_id=? where course_id=?`,
        [name, courseDescription, subjectId, classId, courseId],
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
  deleteCourse(courseId): Promise<DatabaseUpdate> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `delete from course where course_id=?`,
        [courseId],
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

  deleteUserCourse(courseId, userId): Promise<DatabaseUpdate> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `delete from course_persons where course_id=? and person_id=?`,
        [courseId, userId],
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

  getCourseById(courseId: number): Promise<CourseTable[]> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `select * from course where course_id=?`,
        [courseId],
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

  getUser(courseId: number, personId: number): Promise<CourseUser[]> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `select * from course_persons where course_id=? and person_id=?`,
        [courseId, personId],
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
