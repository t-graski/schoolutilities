import { HttpStatus, Injectable } from '@nestjs/common';
import { regex } from 'src/regex';
import { DatabaseUpdate } from 'src/types/Database';
import { nanoid } from 'nanoid';
import validator from 'validator';
import { PrismaClient } from '@prisma/client';
import { LENGTHS, RETURN_DATA } from 'src/misc/parameterConstants';
import {
  AddClass,
  AddDepartment,
  AddSchool,
  ReturnMessage,
  UpdateClass,
  UpdateDepartment,
  AddJoinCode,
  JoinCodeTable,
  RemoveJoinCode,
  UpdateJoinCode,
  GetAllJoinCodes,
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
      return RETURN_DATA.INVALID_INPUT;
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
      return RETURN_DATA.DATABASE_ERORR;
    }
    return RETURN_DATA.SUCCESS;
  }

  async addClass(body: AddClass): Promise<ReturnMessage> {
    const { departmentId, className } = body;
    if (
      !validator.isLength(className, LENGTHS.CLASS_NAME) ||
      !validator.isNumeric(departmentId)
    ) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const isNotAvailable = await prisma.schoolClasses.findFirst({
      where: {
        departmentId: Number(departmentId),
        className: className,
      },
    });

    if (isNotAvailable) {
      return RETURN_DATA.ALREADY_EXISTS;
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
      return RETURN_DATA.DATABASE_ERORR;
    }
    return RETURN_DATA.SUCCESS;
  }

  async removeClass(classId: number): Promise<ReturnMessage> {
    if (!validator.isNumeric(classId)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const schoolClass = await prisma.schoolClasses.findUnique({
      where: {
        classId: Number(classId),
      },
    });

    if (!schoolClass) {
      return RETURN_DATA.NOT_FOUND;
    }

    try {
      await prisma.schoolClasses.delete({
        where: {
          classId: Number(classId),
        },
      });
    } catch (err) {
      // Foreign key constraint failed
      if (err.code === 'P2003') {
        return RETURN_DATA.REFERENCE_ERROR;
      } else {
        return RETURN_DATA.DATABASE_ERORR;
      }
    }
    return RETURN_DATA.SUCCESS;
  }

  async updateClass(body: UpdateClass): Promise<ReturnMessage> {
    const { departmentId, className, classId } = body;
    if (
      !validator.isLength(className, LENGTHS.CLASS_NAME) ||
      !validator.isNumeric(departmentId) ||
      !validator.isNumeric(classId)
    ) {
      return RETURN_DATA.INVALID_INPUT;
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
      return RETURN_DATA.DATABASE_ERORR;
    }
    return RETURN_DATA.SUCCESS;
  }

  async addDepartment(body: AddDepartment): Promise<ReturnMessage> {
    const { name, schoolId, isVisible, childsVisible } = body;
    if (
      !validator.isLength(name, LENGTHS.DEPARTMENT_NAME) ||
      !validator.isNumeric(schoolId) ||
      !validator.isBoolean(isVisible) ||
      !validator.isBoolean(childsVisible)
    ) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const isNotAvailable = await prisma.departments.findFirst({
      where: {
        schoolId: Number(schoolId),
        name: name,
      },
    });

    if (isNotAvailable) {
      return RETURN_DATA.ALREADY_EXISTS;
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
          isVisible: this.toBoolean(isVisible),
          childsVisible: this.toBoolean(childsVisible),
        },
      });
    } catch (err) {
      return RETURN_DATA.DATABASE_ERORR;
    }
    return RETURN_DATA.SUCCESS;
  }

  async removeDepartment(body: UpdateDepartment): Promise<ReturnMessage> {
    const { departmentId } = body;
    if (!validator.isNumeric(departmentId)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const department = await prisma.departments.findUnique({
      where: {
        departmentId: Number(departmentId),
      },
    });

    if (!department) {
      return RETURN_DATA.NOT_FOUND;
    }
    try {
      await prisma.departments.delete({
        where: {
          departmentId: Number(departmentId),
        },
      });
    } catch (err) {
      // Foreign key constraint failed
      if (err.code === 'P2003') {
        return RETURN_DATA.REFERENCE_ERROR;
      } else {
        return RETURN_DATA.DATABASE_ERORR;
      }
    }
    return RETURN_DATA.SUCCESS;
  }

  async updateDepartment(body: UpdateDepartment): Promise<ReturnMessage> {
    const { name, isVisible, childsVisible, departmentId } = body;
    if (
      !validator.isLength(name, LENGTHS.DEPARTMENT_NAME) ||
      !validator.isNumeric(departmentId) ||
      !validator.isBoolean(isVisible) ||
      !validator.isBoolean(childsVisible)
    ) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const department = await prisma.departments.findUnique({
      where: {
        departmentId: Number(departmentId),
      },
    });

    if (!department) {
      return RETURN_DATA.NOT_FOUND;
    }

    try {
      await prisma.departments.update({
        where: {
          departmentId: Number(departmentId),
        },
        data: {
          name,
          isVisible: this.toBoolean(isVisible),
          childsVisible: this.toBoolean(childsVisible),
        },
      });
    } catch (err) {
      return RETURN_DATA.DATABASE_ERORR;
    }
    return RETURN_DATA.SUCCESS;
  }

  async addJoinCode(body: AddJoinCode): Promise<ReturnMessage> {
    const { schoolId, expireDate, name, personId } = body;
    if (
      !validator.isNumeric(schoolId) ||
      !validator.isLength(name, LENGTHS.JOIN_CODE_NAME) ||
      !validator.isNumeric(personId) ||
      !(new Date(expireDate).getTime() > 0)
    ) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const nameIsNotAvailable = await prisma.schoolJoinCodes.findFirst({
      where: {
        schoolId: Number(schoolId),
        joinCodeName: name,
      },
    });

    if (nameIsNotAvailable) {
      return RETURN_DATA.ALREADY_EXISTS;
    }

    const schoolJoinCodes = await prisma.schoolJoinCodes.findMany({
      where: {
        schoolId: Number(schoolId),
      },
    });

    if (schoolJoinCodes.length >= LENGTHS.MAX_JOIN_CODES) {
      return RETURN_DATA.MAX_JOIN_CODES_REACHED;
    }

    const joinCode = await this.generateJoinCode();
    try {
      await prisma.schoolJoinCodes.create({
        data: {
          schools: {
            connect: {
              schoolId: Number(schoolId),
            },
          },
          joinCodeName: name,
          joinCode,
          expireDate: new Date(expireDate),
          persons: {
            connect: {
              personId: Number(personId),
            },
          },
        },
      });
    } catch (err) {
      console.log(err);

      return RETURN_DATA.DATABASE_ERORR;
    }
    return RETURN_DATA.SUCCESS;
  }

  async removeJoinCode(body: RemoveJoinCode): Promise<ReturnMessage> {
    const { joinCodeId } = body;
    if (!validator.isNumeric(joinCodeId)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const joinCode = await prisma.schoolJoinCodes.findUnique({
      where: {
        schoolJoinCodeId: Number(joinCodeId),
      },
    });

    if (!joinCode) {
      return RETURN_DATA.NOT_FOUND;
    }

    try {
      await prisma.schoolJoinCodes.delete({
        where: {
          schoolJoinCodeId: Number(joinCodeId),
        },
      });
    } catch (err) {
      // Foreign key constraint failed
      if (err.code === 'P2003') {
        return RETURN_DATA.REFERENCE_ERROR;
      } else {
        return RETURN_DATA.DATABASE_ERORR;
      }
    }
    return RETURN_DATA.SUCCESS;
  }

  async updateJoinCode(body: UpdateJoinCode): Promise<ReturnMessage> {
    const { joinCodeId, expireDate, name } = body;
    if (
      !validator.isNumeric(joinCodeId) ||
      !(new Date(expireDate).getTime() > 0) ||
      !validator.isLength(name, LENGTHS.JOIN_CODE_NAME)
    ) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const joinCode = await prisma.schoolJoinCodes.findUnique({
      where: {
        schoolJoinCodeId: Number(joinCodeId),
      },
    });

    if (!joinCode) {
      return RETURN_DATA.NOT_FOUND;
    }
    try {
      await prisma.schoolJoinCodes.update({
        where: {
          schoolJoinCodeId: Number(joinCodeId),
        },
        data: {
          joinCodeName: name,
          expireDate: new Date(expireDate),
        },
      });
    } catch (err) {
      return RETURN_DATA.DATABASE_ERORR;
    }
    return RETURN_DATA.SUCCESS;
  }

  async getAllJoinCodes(body: GetAllJoinCodes): Promise<ReturnMessage> {
    const { schoolId } = body;

    if (!validator.isNumeric(schoolId)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const joinCodes = await prisma.schoolJoinCodes.findMany({
      where: {
        schoolId: Number(schoolId),
      },
      select: {
        joinCodeName: true,
        expireDate: true,
        joinCode: true,
        personCreationId: true,
      },
    });

    if (!joinCodes) {
      return RETURN_DATA.NOT_FOUND;
    }
    return {
      status: HttpStatus.OK,
      data: joinCodes,
    };
  }

  async generateJoinCode(): Promise<string> {
    let joinCode = nanoid();
    const joinCodeExists = await prisma.schoolJoinCodes.findUnique({
      where: {
        joinCode: joinCode,
      },
    });

    if (!joinCodeExists) return joinCode;
    while (
      await !prisma.schoolJoinCodes.findUnique({
        where: {
          joinCode: joinCode,
        },
      })
    ) {
      joinCode = nanoid();
    }
    return joinCode;
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

  toBoolean(value): boolean {
    return value === '1';
  }
}
