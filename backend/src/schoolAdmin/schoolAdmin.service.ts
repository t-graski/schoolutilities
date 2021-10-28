import { HttpStatus, Injectable } from '@nestjs/common';
import { regex } from 'src/regex';
import { DatabaseUpdate } from 'src/types/Database';
import { nanoid } from 'nanoid';
import { requestDb } from 'src/misc/requestDb';
import {
  AddClass,
  AddClassReturnValue,
  AddDepartment,
  AddDepartmentReturnValue,
  AddSchool,
  AddSchoolReturnValue,
  ClassTable,
  ReturnMessage,
  UpdateClass,
  UpdateDepartment,
  AddJoinCode,
  AddJoinCodeReturnValue,
  JoinCodeTable,
  RemoveJoinCode,
  RemoveJoinCodeReturnValue,
  updateJoinCode,
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
    if (!regex.title.test(name) || !regex.timezone.test(timezone)) {
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

  async addClass(body: AddClass): Promise<AddClassReturnValue> {
    const { departmentId, className } = body;
    if (!regex.title.test(className)) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid input',
      };
    }
    const classInsertData = await this.insertClass(departmentId, className);
    if (classInsertData.affectedRows === 1) {
      return {
        status: HttpStatus.OK,
        message: 'Class added successfully',
        data: { classId: classInsertData.insertId },
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Class not added',
      };
    }
  }

  async removeClass(classId: number): Promise<ReturnMessage> {
    const schoolClass = await this.getClassById(classId);
    if (schoolClass.length === 0) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Class not found',
      };
    }
    const deleteClass = await this.deleteClass(classId);
    if (deleteClass.affectedRows === 1) {
      return {
        status: HttpStatus.OK,
        message: 'Class deleted successfully',
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Class not deleted',
      };
    }
  }

  async updateClass(body: UpdateClass): Promise<ReturnMessage> {
    const { departmentId, className, classId } = body;
    if (!regex.title.test(className)) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid input',
      };
    }
    const classUpdateData = await this.patchClass(
      departmentId,
      className,
      classId,
    );
    if (classUpdateData.affectedRows === 1) {
      return {
        status: HttpStatus.OK,
        message: 'Class updated successfully',
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Class not updated',
      };
    }
  }
  getClassById(classId: number): Promise<ClassTable[]> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `select * from class where class_id=?`,
        [classId],
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
  async addDepartment(body: AddDepartment): Promise<AddDepartmentReturnValue> {
    const { name, schoolId, isVisible, childsVisible } = body;
    if (!regex.title.test(name)) {
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
    if (!regex.title.test(name)) {
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

  async addJoinCode(body: AddJoinCode): Promise<AddJoinCodeReturnValue> {
    const { schoolId, expireDate, name, personId } = body;
    const generatedJoinCode = await this.generateJoinCode();
    const joinCodeInsertData = await this.insertJoinCode(
      schoolId,
      expireDate,
      name,
      personId,
      generatedJoinCode,
    );
    if (joinCodeInsertData.affectedRows === 1) {
      return {
        status: HttpStatus.OK,
        message: 'Joincode added successfully',
        data: {
          joinCodeId: joinCodeInsertData.insertId,
          joinCode: generatedJoinCode,
        },
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Joincode not added',
      };
    }
  }

  async removeJoinCode(
    body: RemoveJoinCode,
  ): Promise<RemoveJoinCodeReturnValue> {
    const { joinCodeId } = body;
    const joinCodeInsertData = await this.deleteJoinCode(joinCodeId);
    if (joinCodeInsertData.affectedRows === 1) {
      return {
        status: HttpStatus.OK,
        message: 'Joincode removed successfully',
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Joincode not removed',
      };
    }
  }

  async updateJoinCode(body: updateJoinCode): Promise<ReturnMessage> {
    const { joinCodeId, expireDate, name } = body;
    const joinCodeUpdateData = await this.patchJoinCode(
      joinCodeId,
      expireDate,
      name,
    );
    if (joinCodeUpdateData.affectedRows === 1) {
      return {
        status: HttpStatus.OK,
        message: 'Join code updated successfully',
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Join code not updated',
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
        `insert into school (name, language_id, timezone) values (?,?,?)`,
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

  insertJoinCode(
    schoolId,
    expireDate,
    name = '',
    personId,
    joinCode,
  ): Promise<DatabaseUpdate> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `insert into school_join_codes (school_id, join_code, expire_date, join_code_name, person_creation_id) values (?,?,?,?,?)`,
        [schoolId, joinCode, expireDate, name, personId],
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

  deleteJoinCode(joinCodeId): Promise<DatabaseUpdate> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `delete from school_join_codes where school_join_code_id=?`,
        [joinCodeId],
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

  patchJoinCode(
    joinCodeId,
    expireDate = null,
    name = '',
  ): Promise<DatabaseUpdate> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `update school_join_codes set expire_date=?, join_code_name=? where school_join_code_id=?`,
        [expireDate, name, joinCodeId],
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

  insertClass(departmentId, class_name): Promise<DatabaseUpdate> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `INSERT INTO class (department_id, class_name) VALUES (?, ?)`,
        [departmentId, class_name],
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

  deleteClass(classId): Promise<DatabaseUpdate> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `delete from class where class_id=?`,
        [classId],
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

  patchClass(departmentId, class_name, class_id): Promise<DatabaseUpdate> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `update class set department_id=?, class_name=? where class_id=?`,
        [departmentId, class_name, class_id],
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

  async generateJoinCode(): Promise<string> {
    let joinCode = nanoid();
    const joinCodeExists = await this.getJoinCode(joinCode);
    if (joinCodeExists.length === 0) return joinCode;
    while ((await this.getJoinCode(joinCode)).length !== 0) {
      joinCode = nanoid();
    }
    return nanoid();
  }

  getJoinCode(joinCode): Promise<JoinCodeTable[]> {
    return new Promise<JoinCodeTable[]>((resolve, reject) => {
      this.connection.query(
        `select * from school_join_codes where join_code=?`,
        [joinCode],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        },
      );
    });
  }

  getJoinCodeById(joinCode): Promise<JoinCodeTable[]> {
    return new Promise<JoinCodeTable[]>((resolve, reject) => {
      this.connection.query(
        `select * from school_join_codes where school_join_code_id=?`,
        [joinCode],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        },
      );
    });
  }
}
