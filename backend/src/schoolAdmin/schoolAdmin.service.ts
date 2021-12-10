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
  GetClasses,
  GetDepartments,
} from 'src/types/SchoolAdmin';
import { DatabaseService } from 'src/database/database.service';
import { AuthService } from 'src/auth/auth.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('mysql2');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const prisma = new PrismaClient();

@Injectable()
export class SchoolAdminService {
  connection: any;
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly authService: AuthService,
  ) {
    this.connection = mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });
    this.connection.connect();
  }

  async addSchoolConfig(
    body: AddSchool,
    token: string,
  ): Promise<ReturnMessage> {
    const { name, languageId, timezone } = body;
    if (
      !validator.isLength(name, LENGTHS.CLASS_NAME)
      // !regex.timezone.test(timezone) ||
      // !validator.isNumeric(languageId)
    ) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const jwt = await this.authService.decodeJWT(token);
    const personUUID = jwt.personUUID;
    const personId = await this.databaseService.getPersonIdByUUID(personUUID);

    try {
      const school = await prisma.schools.create({
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

      await prisma.schoolPersons.create({
        data: {
          schools: {
            connect: {
              schoolId: Number(school.schoolId),
            },
          },
          persons: {
            connect: {
              personId: Number(personId),
            },
          },
        },
      });

      await prisma.personRoles.create({
        data: {
          roles: {
            connect: {
              roleId: 1,
            },
          },
          persons: {
            connect: {
              personId: Number(personId),
            },
          },
          schools: {
            connect: {
              schoolId: Number(school.schoolId),
            },
          },
        },
      });

      return {
        status: RETURN_DATA.SUCCESS.status,
        data: {
          schoolUUID: school.schoolUUID,
          schoolName: school.name,
          languageId: school.languageId == 1 ? 'de' : 'en',
          timezone: school.timezone,
        },
      };
    } catch (err) {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  async addClass(body: AddClass): Promise<ReturnMessage> {
    const { departmentUUID, className } = body;
    if (
      !validator.isLength(className, LENGTHS.CLASS_NAME) ||
      !validator.isUUID(departmentUUID.slice(1), 4)
    ) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const departmentId = await this.databaseService.getDepartmentIdByUUID(
      departmentUUID,
    );

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
      const schoolClass = await prisma.schoolClasses.create({
        data: {
          classUUID: `${ID_STARTERS.CLASS}${uuidv4()}`,
          departments: {
            connect: {
              departmentId: Number(departmentId),
            },
          },
          className: className,
        },
      });

      delete schoolClass.departmentId;
      delete schoolClass.classId;

      return {
        status: RETURN_DATA.SUCCESS.status,
        data: schoolClass,
      };
    } catch (err) {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  async removeClass(classUUID: string): Promise<ReturnMessage> {
    if (!validator.isUUID(classUUID.slice(1), 4)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const classId = await this.databaseService.getClassIdByUUID(classUUID);

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
        return RETURN_DATA.DATABASE_ERROR;
      }
    }
    return RETURN_DATA.SUCCESS;
  }

  async updateClass(body: UpdateClass): Promise<ReturnMessage> {
    const { className, classUUID, departmentUUID } = body;
    if (
      !validator.isLength(className, LENGTHS.CLASS_NAME) ||
      !validator.isUUID(classUUID.slice(1), 4) ||
      !validator.isUUID(departmentUUID.slice(1), 4)
    ) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const classId = await this.databaseService.getClassIdByUUID(classUUID);
    const departmentId = await this.databaseService.getDepartmentIdByUUID(
      departmentUUID,
    );

    try {
      const schoolClass = await prisma.schoolClasses.update({
        where: {
          classId: Number(classId),
        },
        data: {
          className: className,
          departments: {
            connect: {
              departmentId: Number(departmentId),
            },
          },
        },
      });

      delete schoolClass.departmentId;
      delete schoolClass.classId;

      return {
        status: RETURN_DATA.SUCCESS.status,
        data: schoolClass,
      };
    } catch (err) {
      if (err.code === 'P2002') {
        return RETURN_DATA.ALREADY_EXISTS;
      }
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  async getClasses(schoolUUID: string): Promise<ReturnMessage> {
    if (!validator.isUUID(schoolUUID.slice(1), 4)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const departments = await this.databaseService.getDepartments({
      schoolUUID,
    });

    const classes = [];
    try {
      for (const department of departments.data) {
        const departmentClasses = await prisma.schoolClasses.findMany({
          where: {
            departmentId: department.departmentId,
          },
        });

        const filteredClasses = departmentClasses.map((departmentClass) => {
          return {
            departmentUUID: department.departmentUUID,
            departmentName: department.name,
            classUUID: departmentClass.classUUID,
            className: departmentClass.className,
          };
        });

        classes.push(...filteredClasses);
      }
      return {
        status: RETURN_DATA.SUCCESS.status,
        data: classes,
      };
    } catch (err) {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  async getDepartments(schoolUUID: string): Promise<ReturnMessage> {
    if (!validator.isUUID(schoolUUID.slice(1), 4)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const schoolId = await this.databaseService.getSchoolIdByUUID(schoolUUID);

    try {
      const departments = await prisma.departments.findMany({
        where: {
          schoolId: Number(schoolId),
        },
      });

      const departmentsWithoutIds = departments.map((department) => {
        const { departmentUUID, name, isVisible, childsVisible } = department;
        return {
          departmentUUID: departmentUUID,
          departmentName: name,
          isVisible: isVisible,
          childsVisible: childsVisible,
        };
      });

      return {
        status: RETURN_DATA.SUCCESS.status,
        data: departmentsWithoutIds,
      };
    } catch (err) {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  async addDepartment(body: AddDepartment): Promise<ReturnMessage> {
    const { departmentName, schoolUUID, isVisible, childsVisible } = body;
    if (
      !validator.isLength(departmentName, LENGTHS.DEPARTMENT_NAME) ||
      !validator.isUUID(schoolUUID.slice(1), 4) ||
      !validator.isBoolean(isVisible) ||
      !validator.isBoolean(childsVisible)
    ) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const schoolId = await this.databaseService.getSchoolIdByUUID(schoolUUID);

    const isNotAvailable = await prisma.departments.findFirst({
      where: {
        schoolId: Number(schoolId),
        name: departmentName,
      },
    });

    if (isNotAvailable) {
      return RETURN_DATA.ALREADY_EXISTS;
    }

    try {
      const department = await prisma.departments.create({
        data: {
          departmentUUID: `${ID_STARTERS.DEPARTMENT}${uuidv4()}`,
          name: departmentName,
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
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  async addDepartments(body): Promise<ReturnMessage> {
    if (body.departments.length == 0) {
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
        const addDepartment = await this.addDepartment(department);
        if (addDepartment.status != 200) {
          return addDepartment;
        }
      }
    } catch (err) {
      return RETURN_DATA.DATABASE_ERROR;
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
        return RETURN_DATA.DATABASE_ERROR;
      }
    }
    return RETURN_DATA.SUCCESS;
  }

  async updateDepartment(body: UpdateDepartment): Promise<ReturnMessage> {
    const { departmentUUID, departmentName, isVisible, childsVisible } = body;
    if (
      !validator.isLength(departmentName, LENGTHS.DEPARTMENT_NAME) ||
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
          name: departmentName,
          isVisible: this.toBoolean(isVisible),
          childsVisible: this.toBoolean(childsVisible),
        },
      });
    } catch (err) {
      if (err.code === 'P2002') {
        return RETURN_DATA.UNIQUE_ERROR;
      }
      return RETURN_DATA.DATABASE_ERROR;
    }
    return RETURN_DATA.SUCCESS;
  }

  async joinSchool(joinCode: string, token: string): Promise<ReturnMessage> {
    const jwt = await this.authService.decodeJWT(token);

    const personUUID = jwt.personUUID;
    const schoolUUID = await this.databaseService.getSchoolUUIDByJoinCode(
      joinCode,
    );

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
      if (err.code === 'P2002') {
        return RETURN_DATA.ALREADY_EXISTS;
      }
      return RETURN_DATA.DATABASE_ERROR;
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
      return RETURN_DATA.DATABASE_ERROR;
    }

    return RETURN_DATA.SUCCESS;
  }

  async addJoinCode(body: AddJoinCode): Promise<ReturnMessage> {
    const { schoolUUID, expireDate, name = '', personUUID } = body;

    if (
      !validator.isUUID(schoolUUID.slice(1), 4) ||
      !validator.isLength(name, LENGTHS.JOIN_CODE_NAME) ||
      !validator.isUUID(personUUID.slice(1), 4) ||
      !(new Date(expireDate).getTime() > 0)
    ) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const schoolId = await this.databaseService.getSchoolIdByUUID(schoolUUID);
    const personId = await this.databaseService.getPersonIdByUUID(personUUID);

    const nameIsNotAvailable = await prisma.schoolJoinCodes.findFirst({
      where: {
        schoolId: Number(schoolId),
        joinCodeName: name,
      },
    });

    if (nameIsNotAvailable && nameIsNotAvailable.joinCodeName !== '') {
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
      return RETURN_DATA.DATABASE_ERROR;
    }
    return RETURN_DATA.SUCCESS;
  }

  async removeJoinCode(body: RemoveJoinCode): Promise<ReturnMessage> {
    const { joinCode } = body;

    if (!joinCode) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const joinCodeData = await prisma.schoolJoinCodes.findUnique({
      where: {
        joinCode: joinCode,
      },
    });

    if (!joinCodeData) {
      return RETURN_DATA.NOT_FOUND;
    }

    try {
      await prisma.schoolJoinCodes.delete({
        where: {
          joinCode: joinCode,
        },
      });
    } catch (err) {
      // Foreign key constraint failed
      if (err.code === 'P2003') {
        return RETURN_DATA.REFERENCE_ERROR;
      } else {
        return RETURN_DATA.DATABASE_ERROR;
      }
    }
    return RETURN_DATA.SUCCESS;
  }

  async updateJoinCode(body: UpdateJoinCode): Promise<ReturnMessage> {
    const { joinCode, expireDate, name = '' } = body;
    if (
      !(new Date(expireDate).getTime() > 0) ||
      !validator.isLength(name, LENGTHS.JOIN_CODE_NAME)
    ) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const joinCodeData = await prisma.schoolJoinCodes.findUnique({
      where: {
        joinCode,
      },
    });

    if (!joinCodeData) {
      return RETURN_DATA.NOT_FOUND;
    }

    try {
      await prisma.schoolJoinCodes.update({
        where: {
          joinCode,
        },
        data: {
          joinCodeName: name,
          expireDate: new Date(expireDate),
        },
      });
    } catch (err) {
      if (err.code === 'P2002') {
        return RETURN_DATA.ALREADY_EXISTS;
      }
      return RETURN_DATA.DATABASE_ERROR;
    }
    return RETURN_DATA.SUCCESS;
  }

  async getAllJoinCodes(schoolUUID: string): Promise<ReturnMessage> {
    if (!validator.isUUID(schoolUUID.slice(1), 4)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const schoolId = await this.databaseService.getSchoolIdByUUID(schoolUUID);

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

    const joinCodesData = [];

    for (const joinCode of joinCodes) {
      const person = await this.databaseService.getPersonById(
        joinCode.personCreationId,
      );

      joinCodesData.push({
        joinCodeName: joinCode.joinCodeName,
        expireDate: joinCode.expireDate,
        joinCode: joinCode.joinCode,
        personUUID: person.personUUID,
        firstName: person.firstName,
        lastName: person.lastName,
      });
    }

    if (!joinCodes) {
      return RETURN_DATA.NOT_FOUND;
    }
    return {
      status: HttpStatus.OK,
      data: joinCodesData,
    };
  }

  async generateJoinCode(): Promise<string> {
    let joinCode = nanoid().slice(8);
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
      joinCode = nanoid().slice(8);
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

  async getPersonsOfSchool(schoolUUID: string): Promise<ReturnMessage> {
    if (!validator.isUUID(schoolUUID.slice(1), 4)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const schoolId = await this.databaseService.getSchoolIdByUUID(schoolUUID);

    try {
      const persons = await prisma.schoolPersons.findMany({
        where: {
          schoolId: Number(schoolId),
        },
        select: {
          personId: true,
        },
      });

      const personsData = [];
      for (const person of persons) {
        const personData = await this.databaseService.getPersonById(
          person.personId,
        );

        const personRole =
          await this.databaseService.getPersonRolesByPersonUUID(
            personData.personUUID,
          );

        personsData.push({
          personUUID: personData.personUUID,
          firstName: personData.firstName,
          lastName: personData.lastName,
          roleName: personRole[0].roleName,
          roleUUID: personRole[0].roleUUID,
        });
      }
      return {
        status: RETURN_DATA.SUCCESS.status,
        data: personsData,
      };
    } catch (err) {
      console.log(err);

      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  toBoolean(value): boolean {
    return value === '1';
  }
}
