import { HttpStatus, Injectable } from '@nestjs/common';
import { regex } from 'src/regex';
import { DatabaseUpdate } from 'src/types/Database';
import {
  AddDepartment,
  AddDepartmentReturnValue,
  AddSchool,
  AddSchoolReturnValue,
  ReturnMessage,
  UpdateDepartment,
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

  async addSchoolConfig(body: AddSchool): Promise<AddSchoolReturnValue> {
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

  async addDepartment(body: AddDepartment): Promise<AddDepartmentReturnValue> {
    const { name, schoolId, isVisible, childsVisible } = body;
    if (!regex.schoolName.test(name)) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid input',
      };
    }
    const departmentInsertData = await this.insertDepartment(
      name,
      schoolId,
      isVisible,
      childsVisible,
    );
    if (departmentInsertData.affectedRows === 1) {
      return {
        status: HttpStatus.OK,
        message: 'Department added successfully',
        data: { departmentId: departmentInsertData.insertId },
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Department not added',
      };
    }
  }

  async removeDepartment(departmentId: number): Promise<ReturnMessage> {
    const department = await this.getDepartmentById(departmentId);
    if (department.length === 0) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Department not found',
      };
    }
    const deleteDepartment = await this.deleteDepartment(departmentId);
    if (deleteDepartment.affectedRows === 1) {
      return {
        status: HttpStatus.OK,
        message: 'Department deleted successfully',
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Department not deleted',
      };
    }
  }

  async updateDepartment(body: UpdateDepartment): Promise<ReturnMessage> {
    const { name, isVisible, childsVisible, departmentId } = body;
    if (!regex.schoolName.test(name)) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid input',
      };
    }
    const departmentUpdateData = await this.patchDepartment(
      name,
      isVisible,
      childsVisible,
      departmentId,
    );
    if (departmentUpdateData.affectedRows === 1) {
      return {
        status: HttpStatus.OK,
        message: 'Department updated successfully',
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Department not updated',
      };
    }
  }

  getDepartmentById(departmentId: number): Promise<DatabaseUpdate[]> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `select * from departments where department_id=?`,
        [departmentId],
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
  insertDepartment(
    name,
    schoolId,
    isVisible,
    childsVisible,
  ): Promise<DatabaseUpdate> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `INSERT INTO departments (name, school_id, is_visible, childs_visible) VALUES (?, ?, ?, ?)`,
        [name, schoolId, isVisible ? 1 : 0, childsVisible ? 1 : 0],
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

  deleteDepartment(departmentId): Promise<DatabaseUpdate> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `delete from departments where department_id=?`,
        [departmentId],
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

  patchDepartment(
    name,
    isVisible,
    childsVisible,
    departmentId,
  ): Promise<DatabaseUpdate> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `update departments set name=?, is_visible=?, childs_visible=? where department_id=?`,
        [name, isVisible ? 0 : 1, childsVisible ? 0 : 1, departmentId],
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
