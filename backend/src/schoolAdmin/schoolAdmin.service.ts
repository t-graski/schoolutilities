import { Injectable, HttpStatus, InternalServerErrorException } from '@nestjs/common';
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
  JoinSchool,
  UserPermissions,
} from 'src/types/SchoolAdmin';
import { DatabaseService } from 'src/database/database.service';
import { AuthService } from 'src/auth/auth.service';
import { HelperService } from 'src/helper/helper.service';
import { AddSchoolDTO, School } from 'src/entity/school/school';
// import { AddDepartmentDTO, DeleteDepartmentDTO, Department, UpdateDepartmentDTO } from 'src/entity/department/department';
// import { AddSchoolClassDTO, DeleteSchoolClassDTO, SchoolClass, UpdateSchoolClassDTO } from 'src/entity/school-class/schoolClass';
// import { AddJoinCodeDTO, DeleteJoinCodeDTO, JoinCode, JoinSchoolDTO, LeaveSchoolDTO, UpdateJoinCodeDTO } from 'src/entity/join-code/joinCode';
// import { User } from 'src/entity/user/user';
// import { UpdateRoleDTO, UserRole } from 'src/entity/user-role/userRole';
import { SchoolRole } from 'src/entity/school-role/schoolRole';
import { AddSchoolSubjectDTO, SchoolSubject, UpdateSchoolSubjectDTO } from 'src/entity/subject/schoolSubject';
import { AddSchoolRoomDTO, SchoolRoom, UpdateSchoolRoomDTO } from 'src/entity/school-room/schoolRoom';
import { Request } from 'express';
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
          schoolName: name,
          schoolDescription: description,
          users: {
            connect: {
              userId: Number(personId),
            },
          },
          schoolLanguageId: Number(languageId),
          schoolTimezone: timezone,
        },
      });

      await prisma.schoolUsers.create({
        data: {
          schools: {
            connect: {
              schoolId: Number(school.schoolId),
            },
          },
          users: {
            connect: {
              userId: Number(personId),
            },
          },
        },
      });

      await prisma.schoolUserRoles.create({
        data: {
          schoolRoles: {
            connect: {
              schoolRoleId: 1,
            },
          },
          users: {
            connect: {
              userId: Number(personId),
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
          schoolName: school.schoolName,
          schoolDescription: school.schoolDescription,
          languageId: school.schoolLanguageId == 1 ? 'de' : 'en',
          timezone: school.schoolTimezone,
        },
      };
    } catch (err) {
      console.log(err);

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
        schoolClassDepartmentId: Number(departmentId),
        AND: {
          schoolClassName: className,
        }
      },
    });

    if (isNotAvailable) {
      return RETURN_DATA.ALREADY_EXISTS;
    }

    try {
      const schoolClass = await prisma.schoolClasses.create({
        data: {
          schoolClassUUID: `${ID_STARTERS.CLASS}${uuidv4()}`,
          departments: {
            connect: {
              departmentId: Number(departmentId),
            },
          },
          schoolClassName: className,
        },
      });

      delete schoolClass.schoolClassDepartmentId;
      delete schoolClass.schoolClassId;

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
        schoolClassId: Number(classId),
      },
    });

    if (!schoolClass) {
      return RETURN_DATA.NOT_FOUND;
    }

    try {
      await prisma.schoolClasses.delete({
        where: {
          schoolClassId: Number(classId),
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
          schoolClassId: Number(classId),
        },
        data: {
          schoolClassName: className,
          departments: {
            connect: {
              departmentId: Number(departmentId),
            },
          },
        },
      });

      delete schoolClass.schoolClassDepartmentId;
      delete schoolClass.schoolClassId;

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
            schoolClassDepartmentId: department.departmentId,
          },
        });

        const filteredClasses = departmentClasses.map((departmentClass) => {
          return {
            departmentUUID: department.departmentUUID,
            departmentName: department.name,
            classUUID: departmentClass.schoolClassUUID,
            className: departmentClass.schoolClassName,
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
        const { departmentUUID, departmentName, departmentIsVisible, departmentChildsVisible } = department;
        return {
          departmentUUID: departmentUUID,
          departmentName: departmentName,
          isVisible: departmentIsVisible,
          childsVisible: departmentChildsVisible,
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
        departmentName: departmentName,
      },
    });

    if (isNotAvailable) {
      return RETURN_DATA.ALREADY_EXISTS;
    }

    try {
      const department = await prisma.departments.create({
        data: {
          departmentUUID: `${ID_STARTERS.DEPARTMENT}${uuidv4()}`,
          departmentName: departmentName,
          schools: {
            connect: {
              schoolId: Number(schoolId),
            },
          },
          departmentIsVisible: this.toBoolean(isVisible),
          departmentChildsVisible: this.toBoolean(childsVisible),
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
          departmentName: department.name,
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

  async updateDepartment(body): Promise<ReturnMessage> {
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
          departmentName,
          departmentIsVisible: this.toBoolean(isVisible),
          departmentChildsVisible: this.toBoolean(childsVisible),
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

    const person = await prisma.users.findFirst({
      where: {
        userUUID: personUUID,
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
      await prisma.schoolUsers.create({
        data: {
          users: {
            connect: {
              userId: personId,
            },
          },
          schools: {
            connect: {
              schoolId: schoolId,
            },
          },
        },
      });

      await prisma.schoolUserRoles.create({
        data: {
          users: {
            connect: {
              userId: personId,
            },
          },
          schoolRoles: {
            connect: {
              schoolRoleId: 3,
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

    const person = await prisma.users.findUnique({
      where: {
        userUUID: personUUID,
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

    const isOnlyUser = await prisma.schoolUsers.findMany({
      where: {
        schools: {
          schoolId,
        },
      },
    });

    const isOnlyUserArray = isOnlyUser.map((entry) => entry.schoolId);

    if (isOnlyUserArray.length == 1) return RETURN_DATA.LAST_USER;

    try {
      await prisma.schoolUsers.delete({
        where: {
          schoolUserId_schoolId: {
            schoolId: schoolId,
            schoolUserId: personId,
          }
        },
      });
    } catch (err) {
      return RETURN_DATA.DATABASE_ERROR;
    }

    return RETURN_DATA.SUCCESS;
  }

  async addJoinCode(body: AddJoinCode, token: string): Promise<ReturnMessage> {
    const { schoolUUID, schoolJoinCodeExpireTimestamp, schoolJoinCodeName = '' } = body;
    const jwt = await this.authService.decodeJWT(token);
    const personUUID = jwt.personUUID;

    if (
      !validator.isUUID(schoolUUID.slice(1), 4) ||
      !validator.isLength(schoolJoinCodeName, LENGTHS.JOIN_CODE_NAME) ||
      !validator.isUUID(personUUID.slice(1), 4) ||
      !(new Date(schoolJoinCodeExpireTimestamp).getTime() > 0)
    ) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const schoolId = await this.databaseService.getSchoolIdByUUID(schoolUUID);
    const personId = await this.databaseService.getPersonIdByUUID(personUUID);

    const nameIsNotAvailable = await prisma.schoolJoinCodes.findFirst({
      where: {
        schoolId: Number(schoolId),
        schoolJoinCodeName,
      },
    });

    if (nameIsNotAvailable && nameIsNotAvailable.schoolJoinCodeName !== '') {
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
          schoolJoinCodeName,
          schoolJoinCode: joinCode,
          schoolJoinCodeExpireTimestamp: new Date(schoolJoinCodeExpireTimestamp),
          users: {
            connect: {
              userId: Number(personId),
            },
          },
        },
      });

      delete joinCodeData.schoolJoinCodeId;
      delete joinCodeData.schoolId;
      delete joinCodeData.schoolJoinCodeCreatorId;

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
        schoolJoinCode: joinCode,
      },
    });

    if (!joinCodeData) {
      return RETURN_DATA.NOT_FOUND;
    }

    try {
      await prisma.schoolJoinCodes.delete({
        where: {
          schoolJoinCode: joinCode,
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

  async updateJoinCode(body): Promise<ReturnMessage> {
    const { schoolJoinCode, schoolJoinCodeExpireTimestamp, schoolJoinCodeName = '' } = body;

    const joinCodeData = await prisma.schoolJoinCodes.findUnique({
      where: {
        schoolJoinCode: schoolJoinCode,
      },
    });

    if (!joinCodeData) {
      return RETURN_DATA.NOT_FOUND;
    }

    try {
      await prisma.schoolJoinCodes.update({
        where: {
          schoolJoinCode: schoolJoinCode,
        },
        data: {
          schoolJoinCodeName: schoolJoinCodeName,
          schoolJoinCodeExpireTimestamp: new Date(schoolJoinCodeExpireTimestamp),
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
        schoolId,
      },
      select: {
        schoolJoinCodeName: true,
        schoolJoinCodeExpireTimestamp: true,
        schoolJoinCode: true,
        schoolJoinCodeCreatorId: true,
      },
    });

    const joinCodesData = [];

    for (const joinCode of joinCodes) {
      const person = await this.databaseService.getPersonById(
        joinCode.schoolJoinCodeCreatorId,
      );

      joinCodesData.push({
        schoolJoinCodeName: joinCode.schoolJoinCodeName,
        schoolJoinCodeExpireTimestamp: joinCode.schoolJoinCodeExpireTimestamp,
        schoolJoinCode: joinCode.schoolJoinCode,
        userUUID: person.personUUID,
        userFirstname: person.firstName,
        userLastname: person.lastName,
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
        schoolJoinCode: joinCode,
      },
    });

    if (!joinCodeExists) return joinCode;
    while (
      await !prisma.schoolJoinCodes.findUnique({
        where: {
          schoolJoinCode: joinCode,
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
      const users = await prisma.schoolUsers.findMany({
        where: {
          schoolId: Number(schoolId),
        },
        include: {
          schools: true,
          users: {
            include: {
              schoolUserRoles: {
                include: {
                  schoolRoles: true,
                }
              }
            }
          }
        }
      });

      const usersData = [];

      for (const user of users) {
        usersData.push({
          userUUID: user.users.userUUID,
          userFirstname: user.users.userFirstname,
          userLastname: user.users.userLastname,
          schoolRoleName: user.users.schoolUserRoles[0].schoolRoles.schoolRoleName,
          schoolRoleId: user.users.schoolUserRoles[0].schoolRoleId,
        })
      }


      return {
        status: RETURN_DATA.SUCCESS.status,
        data: usersData,
      };
    } catch (err) {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  async getTeachersOfSchool(schoolUUID: string): Promise<ReturnMessage> {
    try {
      const teachers = await prisma.schoolUserRoles.findMany({
        where: {
          schoolRoles: {
            schoolRoleId: 1,
          },
          schools: {
            schoolUUID,
          }
        },
        include: {
          users: true,
        }
      })

      return {
        status: RETURN_DATA.SUCCESS.status,
        data: teachers,
      }
    } catch {
      throw new InternalServerErrorException('Database error');
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
        schoolName: true,
        schoolUUID: true,
        schoolDescription: true,
        schoolCreationTimestamp: true,
        schoolTimezone: true,
        schoolCreatorId: true,
      },
    });

    if (!school) return RETURN_DATA.NOT_FOUND;

    const creator = await this.databaseService.getPersonById(
      school.schoolCreatorId,
    );

    const schoolDataItem = {
      schoolName: school.schoolName,
      schoolUUID: school.schoolUUID,
      schoolDescription: school.schoolDescription,
      schoolTimezone: school.schoolTimezone,
      schoolCreationTimestamp: school.schoolCreationTimestamp,
      creator: {
        userUUID: creator.personUUID,
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
        schoolName: true,
        schoolUUID: true,
        schoolDescription: true,
        schoolCreationTimestamp: true,
        schoolTimezone: true,
        schoolCreatorId: true,
      },
    });

    if (!school) return RETURN_DATA.NOT_FOUND;

    const creator = await this.databaseService.getPersonById(
      school.schoolCreatorId,
    );

    const schoolData = {};

    const schoolDataItem = {
      schoolName: school.schoolName,
      schoolUUID: school.schoolUUID,
      schoolDescription: school.schoolDescription,
      schoolTimezone: school.schoolTimezone,
      schoolCreationTimestamp: school.schoolCreationTimestamp,
      creator: {
        userUUID: creator.personUUID,
        firstName: creator.firstName,
        lastName: creator.lastName,
      },
    };

    schoolData[schoolUUID] = schoolDataItem;

    const persons = await prisma.schoolUsers.findMany({
      where: {
        schoolId: Number(schoolId),
      },
      select: {
        schoolUserId: true,
      },
    });

    const personsData = [];
    for (const person of persons) {
      const personData = await this.databaseService.getPersonById(
        person.schoolUserId,
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
        departmentName: true,
      },
    });

    for (const department of departments) {
      const departmentDataItem = {
        departmentUUID: department.departmentUUID,
        departmentName: department.departmentName,
        classes: [],
      };

      const classes = await prisma.schoolClasses.findMany({
        where: {
          schoolClassDepartmentId: Number(department.departmentId),
        },
        select: {
          schoolClassId: true,
          schoolClassUUID: true,
          schoolClassName: true,
        },
      });

      if (!classes) departmentData.push(departmentDataItem);

      for (const classItem of classes) {
        const classDataItem = {
          classUUID: classItem.schoolClassUUID,
          className: classItem.schoolClassName,
        };

        departmentDataItem.classes.push(classDataItem);
        departmentData.push(departmentDataItem);
      }
    }

    schoolData[schoolUUID].departments = departmentData;

    const coursesData = [];

    const courses = await prisma.courses.findMany({
      where: {
        courseSchoolId: Number(schoolId),
      },
      select: {
        courseId: true,
        courseUUID: true,
        courseName: true,
        courseDescription: true,
        courseCreationTimestamp: true,
        courseCreatorId: true,
      },
    });

    for (const course of courses) {
      const creator = await this.databaseService.getPersonById(
        course.courseCreatorId,
      );

      const courseDataItem = {
        courseName: course.courseName,
        courseUUID: course.courseUUID,
        courseDescription: course.courseDescription,
        courseCreationTimestamp: course.courseCreationTimestamp,
        creator: {
          userUUID: creator.personUUID,
          firstName: creator.firstName,
          lastName: creator.lastName,
        },
        persons: [],
      };

      const coursePersons = await prisma.courseUsers.findMany({
        where: {
          courseId: Number(course.courseId),
        },
        select: {
          userId: true,
        },
      });

      for (const coursePerson of coursePersons) {
        const coursePersonData = await this.databaseService.getPersonById(
          coursePerson.userId,
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
    const { userUUID, schoolUUID, schoolRoleId } = request.body;

    try {
      const userId = await this.helper.getUserIdByUUID(userUUID);
      const schoolId = await this.helper.getSchoolIdByUUID(schoolUUID);

      await prisma.schoolUserRoles.update({
        where: {
          user_school_unique: {
            schoolId,
            userId
          },
        },
        data: {
          users: {
            connect: {
              userUUID,
            },
          },
          schools: {
            connect: {
              schoolUUID
            }
          },
          schoolRoles: {
            connect: {
              schoolRoleId
            }
          }
        },
      });

      return {
        status: RETURN_DATA.SUCCESS.status,
        message: RETURN_DATA.SUCCESS.message,
      }
    } catch (error) {
      throw new InternalServerErrorException('Database error');
    }
  }

  async addSubject(payload: AddSchoolSubjectDTO, request: Request): Promise<SchoolSubject> {
    const { schoolUUID, schoolSubjectName, schoolSubjectAbbreviation } = payload;

    try {
      const subject = await prisma.schoolSubjects.create({
        data: {
          schoolSubjectUUID: `${ID_STARTERS.SUBJECT}${uuidv4()}`,
          schoolSubjectName,
          schoolSubjectAbbreviation,
          school: {
            connect: {
              schoolUUID,
            },
          },
        }
      })
      return new SchoolSubject(subject);
    } catch {
      throw new InternalServerErrorException('Database error');
    }
  }
  async getSubject(subjectUUID: string, request: Request): Promise<SchoolSubject> {
    try {
      const subject = await prisma.schoolSubjects.findUnique({
        where: {
          schoolSubjectUUID: subjectUUID,
        }
      });
      return new SchoolSubject(subject);
    } catch {
      throw new InternalServerErrorException('Database error');
    }
  }

  async getSubjects(schoolUUID: string, request: Request): Promise<SchoolSubject[]> {
    try {
      const subjects = await prisma.schoolSubjects.findMany({
        where: {
          school: {
            schoolUUID,
          }
        }
      });
      return subjects.map(subject => new SchoolSubject(subject));
    } catch {
      throw new InternalServerErrorException('Database error');
    }
  }

  async updateSubject(subject: UpdateSchoolSubjectDTO, request: Request): Promise<SchoolSubject> {
    const { schoolSubjectUUID, schoolSubjectName, schoolSubjectAbbreviation } = subject;
    try {
      const subject = await prisma.schoolSubjects.update({
        where: {
          schoolSubjectUUID,
        },
        data: {
          schoolSubjectName,
          schoolSubjectAbbreviation,
        }
      })
      return new SchoolSubject(subject);
    } catch {
      throw new InternalServerErrorException('Database error');
    }
  }

  async removeSubject(subjectUUID: string, request: Request): Promise<number> {
    try {
      const subject = await prisma.schoolSubjects.delete({
        where: {
          schoolSubjectUUID: subjectUUID,
        }
      })
      return 200;
    } catch (err) {
      throw new InternalServerErrorException('Database error');
    }
  }

  async getRoom(roomUUID: string, request: Request): Promise<SchoolRoom> {
    try {
      const room = await prisma.schoolRooms.findUnique({
        where: {
          schoolRoomUUID: roomUUID,
        }
      });
      return new SchoolRoom(room);
    } catch {
      throw new InternalServerErrorException('Database error');
    }
  }

  async getRooms(schoolUUID: string, request: Request): Promise<SchoolRoom[]> {
    try {
      const rooms = await prisma.schoolRooms.findMany({
        where: {
          schools: {
            schoolUUID
          },
        }
      });
      return rooms.map(room => new SchoolRoom(room));
    } catch {
      throw new InternalServerErrorException('Database error');
    }
  }

  async addRoom(room: AddSchoolRoomDTO, request: Request): Promise<SchoolRoom> {
    const { schoolUUID, schoolRoomName, schoolRoomAbbreviation, schoolRoomBuilding } = room;

    try {
      const room = await prisma.schoolRooms.create({
        data: {
          schoolRoomUUID: `${ID_STARTERS.ROOM}${uuidv4()}`,
          schoolRoomName,
          schoolRoomAbbreviation,
          schoolRoomBuilding,
          schools: {
            connect: {
              schoolUUID,
            },
          },
        }
      })
      return new SchoolRoom(room);
    } catch (err) {
      throw new InternalServerErrorException('Database error');
    }
  }

  async updateRoom(room: UpdateSchoolRoomDTO, request: Request): Promise<SchoolRoom> {
    const { schoolRoomUUID, schoolRoomName, schoolRoomAbbreviation, schoolRoomBuilding } = room;

    try {
      const room = await prisma.schoolRooms.update({
        where: {
          schoolRoomUUID,
        },
        data: {
          schoolRoomName,
          schoolRoomAbbreviation,
          schoolRoomBuilding,
        }
      })
      return new SchoolRoom(room);
    } catch (err) {
      throw new InternalServerErrorException('Database error');
    }
  }

  async removeRoom(roomUUID: string, request: Request): Promise<number> {
    try {
      const room = await prisma.schoolRooms.delete({
        where: {
          schoolRoomUUID: roomUUID,
        }
      })
      return 200;
    } catch (err) {
      throw new InternalServerErrorException('Database error');
    }
  }

  toBoolean(value): boolean {
    return value === '1';
  }
}
