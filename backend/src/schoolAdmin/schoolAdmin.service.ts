import {
  AddClass,
  AddDepartment,
  AddJoinCode,
  AddSchool,
  JoinSchool,
  RemoveJoinCode,
  ReturnMessage,
  UpdateClass,
  UpdateDepartment,
  UpdateJoinCode,
  UserPermissions,
} from 'src/types/SchoolAdmin';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ID_STARTERS, LENGTHS, RETURN_DATA } from 'src/misc/parameterConstants';

import { AuthService } from 'src/auth/auth.service';
import { DatabaseService } from 'src/database/database.service';
import { HelperService } from 'src/helper/helper.service';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { nanoid } from 'nanoid';
import { regex } from 'src/regex';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const prisma = new PrismaClient();

@Injectable()
export class SchoolAdminService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly authService: AuthService,
    private readonly helper: HelperService,
  ) { }

  async addSchoolConfig(
    body: AddSchool,
    token: string,
  ): Promise<ReturnMessage> {
    const { name, languageId, timezone, description = '' } = body;
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
          description,
          personCreationId: Number(personId),
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
          description,
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

      await prisma.personRoles.create({
        data: {
          persons: {
            connect: {
              personId: personId,
            },
          },
          roles: {
            connect: {
              roleId: 3,
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

    return {
      status: RETURN_DATA.SUCCESS.status,
      data: {
        schoolUUID: schoolUUID,
      },
    };
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
    const role = await this.databaseService.getUserRoles(personId.toString());

    const roleEntry = role.find((entry) => entry.schoolId === schoolId);
    if (roleEntry.roleId === 1) {
      return RETURN_DATA.LAST_USER;
    }

    const isOnlyUser = await prisma.schoolPersons.findMany({
      where: {
        schools: {
          schoolId: schoolId,
        },
      },
    });

    const isOnlyUserArray = isOnlyUser.map((entry) => entry.schoolId);

    if (isOnlyUserArray.length == 1) return RETURN_DATA.LAST_USER;

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

  async addJoinCode(body: AddJoinCode, token: string): Promise<ReturnMessage> {
    const { schoolUUID, expireDate, joinCodeName = '' } = body;
    const jwt = await this.authService.decodeJWT(token);
    const personUUID = jwt.personUUID;

    if (
      !validator.isUUID(schoolUUID.slice(1), 4) ||
      !validator.isLength(joinCodeName, LENGTHS.JOIN_CODE_NAME) ||
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
        joinCodeName: joinCodeName,
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
      const joinCodeData = await prisma.schoolJoinCodes.create({
        data: {
          schools: {
            connect: {
              schoolId: Number(schoolId),
            },
          },
          joinCodeName: joinCodeName,
          joinCode,
          expireDate: new Date(expireDate),
          persons: {
            connect: {
              personId: Number(personId),
            },
          },
        },
      });

      delete joinCodeData.schoolJoinCodeId;
      delete joinCodeData.schoolId;
      delete joinCodeData.personCreationId;

      return {
        status: RETURN_DATA.SUCCESS.status,
        data: joinCodeData,
      };
    } catch (err) {
      return RETURN_DATA.DATABASE_ERROR;
    }
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
    const { joinCode, expireDate, joinCodeName = '' } = body;
    if (
      !(new Date(expireDate).getTime() > 0) ||
      !validator.isLength(joinCodeName, LENGTHS.JOIN_CODE_NAME)
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
          joinCodeName,
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

  async getUserPermissions(request: Request): Promise<ReturnMessage> {
    const jwt = await this.helper.extractJWTToken(request);
    const userUUID = await this.helper.getUserUUIDfromJWT(jwt);
    if (!validator.isUUID(userUUID.slice(1), 4)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const personRoles = await this.databaseService.getPersonRolesByPersonUUID(
      userUUID,
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
          roleId: personRole[0].roleId,
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

  async getSchoolInformation(
    schoolUUID: string,
    token: string,
  ): Promise<ReturnMessage> {
    if (!validator.isUUID(schoolUUID.slice(1), 4)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const schoolId = await this.databaseService.getSchoolIdByUUID(schoolUUID);

    const school = await prisma.schools.findUnique({
      where: {
        schoolId: Number(schoolId),
      },
      select: {
        name: true,
        schoolUUID: true,
        description: true,
        creationDate: true,
        timezone: true,
        personCreationId: true,
      },
    });

    if (!school) return RETURN_DATA.NOT_FOUND;

    const creator = await this.databaseService.getPersonById(
      school.personCreationId,
    );

    const schoolDataItem = {
      schoolName: school.name,
      schoolUUID: school.schoolUUID,
      description: school.description,
      timezone: school.timezone,
      creationDate: school.creationDate,
      creator: {
        personUUID: creator.personUUID,
        firstName: creator.firstName,
        lastName: creator.lastName,
      },
    };

    return {
      status: RETURN_DATA.SUCCESS.status,
      data: schoolDataItem,
    };
  }

  async getDetailedSchoolInformation(
    schoolUUID: string,
    token: string,
  ): Promise<ReturnMessage> {
    if (!validator.isUUID(schoolUUID.slice(1), 4)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const schoolId = await this.databaseService.getSchoolIdByUUID(schoolUUID);

    const school = await prisma.schools.findUnique({
      where: {
        schoolId: Number(schoolId),
      },
      select: {
        name: true,
        schoolUUID: true,
        description: true,
        creationDate: true,
        timezone: true,
        personCreationId: true,
      },
    });

    if (!school) return RETURN_DATA.NOT_FOUND;

    const creator = await this.databaseService.getPersonById(
      school.personCreationId,
    );

    const schoolData = {};

    const schoolDataItem = {
      schoolName: school.name,
      schoolUUID: school.schoolUUID,
      description: school.description,
      timezone: school.timezone,
      creationDate: school.creationDate,
      creator: {
        personUUID: creator.personUUID,
        firstName: creator.firstName,
        lastName: creator.lastName,
      },
    };

    schoolData[schoolUUID] = schoolDataItem;

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

      const personRole = await this.databaseService.getPersonRolesByPersonUUID(
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

    schoolData[schoolUUID].persons = personsData;

    const departmentData = [];

    const departments = await prisma.departments.findMany({
      where: {
        schoolId: Number(schoolId),
      },
      select: {
        departmentId: true,
        departmentUUID: true,
        name: true,
      },
    });

    for (const department of departments) {
      const departmentDataItem = {
        departmentUUID: department.departmentUUID,
        name: department.name,
        classes: [],
      };

      const classes = await prisma.schoolClasses.findMany({
        where: {
          departmentId: Number(department.departmentId),
        },
        select: {
          classId: true,
          classUUID: true,
          className: true,
        },
      });

      if (!classes) departmentData.push(departmentDataItem);

      for (const classItem of classes) {
        const classDataItem = {
          classUUID: classItem.classUUID,
          className: classItem.className,
        };

        departmentDataItem.classes.push(classDataItem);
        departmentData.push(departmentDataItem);
      }
    }

    schoolData[schoolUUID].departments = departmentData;

    const coursesData = [];

    const courses = await prisma.courses.findMany({
      where: {
        schoolId: Number(schoolId),
      },
      select: {
        courseId: true,
        courseUUID: true,
        name: true,
        courseDescription: true,
        creationDate: true,
        personCreationId: true,
      },
    });

    for (const course of courses) {
      const creator = await this.databaseService.getPersonById(
        course.personCreationId,
      );

      const courseDataItem = {
        courseName: course.name,
        courseUUID: course.courseUUID,
        description: course.courseDescription,
        creationDate: course.creationDate,
        creator: {
          personUUID: creator.personUUID,
          firstName: creator.firstName,
          lastName: creator.lastName,
        },
        persons: [],
      };

      const coursePersons = await prisma.coursePersons.findMany({
        where: {
          courseId: Number(course.courseId),
        },
        select: {
          personId: true,
        },
      });

      for (const coursePerson of coursePersons) {
        const coursePersonData = await this.databaseService.getPersonById(
          coursePerson.personId,
        );

        const coursePersonItem = {
          personUUID: coursePersonData.personUUID,
          firstName: coursePersonData.firstName,
          lastName: coursePersonData.lastName,
        };

        courseDataItem.persons.push(coursePersonItem);
      }
      coursesData.push(courseDataItem);
    }

    schoolData[schoolUUID].courses = coursesData;

    return {
      status: RETURN_DATA.SUCCESS.status,
      data: schoolData,
    };
  }

  async updateRole(request): Promise<ReturnMessage> {
    const { personUUID, schoolUUID, roleId } = request.body;

    try {
      const personId = await this.helper.getUserIdByUUID(personUUID);
      const schoolId = await this.helper.getSchoolIdByUUID(schoolUUID);
      await prisma.personRoles.update({
        where: {
          schoolPersonId: {
            personId,
            schoolId,
          },
        },
        data: {
          roleId: Number(roleId),
        },
      });
      return RETURN_DATA.SUCCESS;
    } catch (error) {
      console.log(error);
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  toBoolean(value): boolean {
    return value === '1';
  }
}
