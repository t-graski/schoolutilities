import { HttpStatus, Injectable } from '@nestjs/common';
import { regex } from 'src/regex';
import { DatabaseUpdate } from 'src/types/Database';
import { nanoid } from 'nanoid';
import validator from 'validator';
import { PrismaClient } from '@prisma/client';
import { LENGTHS } from 'src/misc/parameterConstants';
import {
  AddClass,
  AddDepartment,
  AddDepartmentReturnValue,
  AddSchool,
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

const prisma = new PrismaClient();
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

  async addSchoolConfig(body: AddSchool): Promise<ReturnMessage> {
    const { name, languageId, timezone } = body;
    if (
      !validator.isLength(name, LENGTHS.CLASS_NAME) ||
      !regex.timezone.test(timezone) ||
      !validator.isNumeric(languageId)
    ) {
      return {
        status: HttpStatus.NOT_ACCEPTABLE,
        message: 'Invalid input',
      };
    }

    try {
      await prisma.schools.create({
        data: {
          name,
          languages: {
            connect: {
              languageId: Number(languageId),
            },
          },
          timezone,
        },
      });
    } catch (err) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'School not added',
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'School added successfully',
    };
  }

  async addClass(body: AddClass): Promise<ReturnMessage> {
    const { departmentId, className } = body;
    if (
      !validator.isLength(className, LENGTHS.CLASS_NAME) ||
      !validator.isNumeric(departmentId)
    ) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid input',
      };
    }

    const isNotAvailable = await prisma.schoolClasses.findFirst({
      where: {
        departmentId: Number(departmentId),
        className: className,
      },
    });

    if (isNotAvailable) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Already exists',
      };
    }

    try {
      await prisma.schoolClasses.create({
        data: {
          departments: {
            connect: {
              departmentId,
            },
          },
          className,
        },
      });
    } catch (err) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Class not added',
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'Class added successfully',
    };
  }

  async removeClass(classId: number): Promise<ReturnMessage> {
    if (!validator.isNumeric(classId)) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid input',
      };
    }

    const schoolClass = await prisma.schoolClasses.findUnique({
      where: {
        classId: Number(classId),
      },
    });

    if (!schoolClass) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Class not found',
      };
    }
    try {
      await prisma.schoolClasses.delete({
        where: {
          classId: Number(classId),
        },
      });
    } catch (err) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Class not removed',
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'Class removed successfully',
    };
  }

  async updateClass(body: UpdateClass): Promise<ReturnMessage> {
    const { departmentId, className, classId } = body;
    if (
      !validator.isLength(className, LENGTHS.CLASS_NAME) ||
      !validator.isNumeric(departmentId) ||
      !validator.isNumeric(classId)
    ) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid input',
      };
    }
    try {
      await prisma.schoolClasses.update({
        where: {
          classId: Number(classId),
        },
        data: {
          className,
          departments: {
            connect: {
              departmentId: Number(departmentId),
            },
          },
        },
      });
    } catch (err) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Class not updated',
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'Class updated successfully',
    };
  }

  async addDepartment(body: AddDepartment): Promise<AddDepartmentReturnValue> {
    const { name, schoolId, isVisible, childsVisible } = body;
    if (
      !validator.isLength(name, LENGTHS.DEPARTMENT_NAME) ||
      !validator.isNumeric(schoolId)
    ) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid input',
      };
    }
    try {
      await prisma.departments.create({
        data: {
          name,
          schools: {
            connect: {
              schoolId: Number(schoolId),
            },
          },
          isVisible,
          childsVisible,
        },
      });
    } catch (err) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Department not added',
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'Department added successfully',
    };
  }

  async removeDepartment(departmentId: number): Promise<ReturnMessage> {
    if (!validator.isNumeric(departmentId)) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid input',
      };
    }

    const department = await prisma.departments.findUnique({
      where: {
        departmentId: Number(departmentId),
      },
    });

    if (!department) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Department not found',
      };
    }
    try {
      await prisma.departments.delete({
        where: {
          departmentId: Number(departmentId),
        },
      });
    } catch (err) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Department not removed',
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'Department removed successfully',
    };
  }

  async updateDepartment(body: UpdateDepartment): Promise<ReturnMessage> {
    const { name, isVisible, childsVisible, departmentId } = body;
    if (
      !validator.isLength(name, LENGTHS.DEPARTMENT_NAME) ||
      !validator.isNumeric(departmentId) ||
      !validator.isBoolean(isVisible) ||
      !validator.isBoolean(childsVisible)
    ) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid input',
      };
    }

    const department = await prisma.departments.findUnique({
      where: {
        departmentId: Number(departmentId),
      },
    });

    if (!department) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Department not found',
      };
    }

    try {
      await prisma.departments.update({
        where: {
          departmentId: Number(departmentId),
        },
        data: {
          name,
          isVisible,
          childsVisible,
        },
      });
    } catch (err) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Department not updated',
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'Department updated successfully',
    };
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
