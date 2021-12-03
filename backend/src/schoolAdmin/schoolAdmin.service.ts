import { Injectable, HttpStatus } from '@nestjs/common';
import { regex } from 'src/regex';
import { nanoid } from 'nanoid';
import validator from 'validator';
import { PrismaClient } from '@prisma/client';
import { LENGTHS, RETURN_DATA, ID_STARTERS } from 'src/misc/parameterConstants';
import { v4 as uuidv4 } from 'uuid';
import { Role, RoleOrder } from '../roles/role.enum';
import {
  AddClass,
  AddSchool,
  ReturnMessage,
  UpdateClass,
  AddDepartment,
  UpdateDepartment,
  AddJoinCode,
  RemoveJoinCode,
  UpdateJoinCode,
  GetAllJoinCodes,
  GetDepartment,
  JoinSchool,
  UserPermissions,
} from 'src/types/SchoolAdmin';
import { DatabaseService } from 'src/database/database.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('mysql2');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const prisma = new PrismaClient();

@Injectable()
export class SchoolAdminService {
  connection: any;
  constructor(private readonly databaseService: DatabaseService) {
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
          schoolUUID: `${ID_STARTERS.SCHOOL}${uuidv4()}`,
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
          classUUID: `${ID_STARTERS.CLASS}${uuidv4()}`,
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

  async getDepartments(body: GetDepartment): Promise<ReturnMessage> {
    const { schoolId } = body;
    if (!validator.isNumeric(schoolId)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    try {
      const departments = await prisma.departments.findMany({
        where: {
          schoolId: Number(schoolId),
        },
      });

      const departmentsWithoutIds = departments.map((department) => {
        const { departmentId, schoolId, ...rest } = department;
        return rest;
      });

      return {
        status: HttpStatus.OK,
        data: departmentsWithoutIds,
      };
    } catch (err) {
      return RETURN_DATA.DATABASE_ERORR;
    }
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
      let department = await prisma.departments.create({
        data: {
          departmentUUID: `${ID_STARTERS.DEPARTMENT}${uuidv4()}`,
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

      delete department.departmentId;
      delete department.schoolId;

      return {
        status: RETURN_DATA.SUCCESS.status,
        data: department,
      };
    } catch (err) {
      return RETURN_DATA.DATABASE_ERORR;
    }
  }

  async addDepartments(body): Promise<ReturnMessage> {
    if (body.data.departments.length == 0) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const names = body.departments.map((department) => department.name);
    const isNotUnique = names.some((name, index) => {
      return names.indexOf(name) !== index;
    });

    if (isNotUnique) {
      return RETURN_DATA.DEPARTMENTS_SAME_NAMES;
    }

    for (const department of body.departments) {
      const isNotAvailable = await prisma.departments.findFirst({
        where: {
          schoolId: Number(department.schoolId),
          name: department.name,
        },
      });
      if (isNotAvailable) {
        return RETURN_DATA.ALREADY_EXISTS;
      }
    }

    try {
      for (const department of body.departments) {
        let addDepartment = await this.addDepartment(department);
        if (addDepartment.status != 200) {
          return addDepartment;
        }
      }
    } catch (err) {
      return RETURN_DATA.DATABASE_ERORR;
    }
    return RETURN_DATA.SUCCESS;
  }

  async removeDepartment(body: UpdateDepartment): Promise<ReturnMessage> {
    const { departmentUUID } = body;
    if (!validator.isUUID(departmentUUID.slice(1), 4)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const departmentId = await this.databaseService.getDepartmentIdByUUID(
      departmentUUID,
    );

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
    const { departmentUUID, name, isVisible, childsVisible } = body;
    if (
      !validator.isLength(name, LENGTHS.DEPARTMENT_NAME) ||
      !validator.isUUID(departmentUUID.slice(1), 4) ||
      !validator.isBoolean(isVisible) ||
      !validator.isBoolean(childsVisible)
    ) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const departmentId = await this.databaseService.getDepartmentIdByUUID(
      departmentUUID,
    );

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
      if (err.code === 'P2002') {
        return RETURN_DATA.UNIQUE_ERROR;
      }
      return RETURN_DATA.DATABASE_ERORR;
    }
    return RETURN_DATA.SUCCESS;
  }

  async joinSchool(body: JoinSchool): Promise<ReturnMessage> {
    const { personUUID, schoolUUID } = body;
    if (
      !validator.isUUID(personUUID.slice(1), 4) ||
      !validator.isUUID(schoolUUID.slice(1), 4)
    ) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const person = await prisma.persons.findFirst({
      where: {
        personUUID: personUUID,
      },
    });

    const school = await prisma.schools.findFirst({
      where: {
        schoolUUID: schoolUUID,
      },
    });

    if (!school || !person) {
      return RETURN_DATA.NOT_FOUND;
    }

    const schoolId = await this.databaseService.getSchoolIdByUUID(schoolUUID);
    const personId = await this.databaseService.getPersonIdByUUID(personUUID);

    try {
      await prisma.schoolPersons.create({
        data: {
          persons: {
            connect: {
              personId: personId,
            },
          },
          schools: {
            connect: {
              schoolId: schoolId,
            },
          },
        },
      });
    } catch (err) {
      return RETURN_DATA.DATABASE_ERORR;
    }

    return RETURN_DATA.SUCCESS;
  }

  async leaveSchool(body: JoinSchool): Promise<ReturnMessage> {
    const { personUUID, schoolUUID } = body;
    if (
      !validator.isUUID(personUUID.slice(1), 4) ||
      !validator.isUUID(schoolUUID.slice(1), 4)
    ) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const person = await prisma.persons.findUnique({
      where: {
        personUUID: personUUID,
      },
    });

    const school = await prisma.schools.findFirst({
      where: {
        schoolUUID: schoolUUID,
      },
    });

    if (!school || !person) {
      return RETURN_DATA.NOT_FOUND;
    }

    const schoolId = await this.databaseService.getSchoolIdByUUID(schoolUUID);
    const personId = await this.databaseService.getPersonIdByUUID(personUUID);

    try {
      await prisma.schoolPersons.delete({
        where: {
          schoolPersonId: {
            personId: personId,
            schoolId: schoolId,
          },
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

  async getUserPermissions(body: UserPermissions): Promise<ReturnMessage> {
    const { personUUID } = body;
    if (!validator.isUUID(personUUID.slice(1), 4)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const personRoles = await this.databaseService.getPersonRolesByPersonUUID(
      personUUID,
    );

    return {
      status: HttpStatus.OK,
      data: personRoles,
    };
  }

  toBoolean(value): boolean {
    return value === '1';
  }
}
