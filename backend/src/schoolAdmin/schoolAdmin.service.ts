import { Injectable, HttpStatus, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { regex } from 'src/regex';
import { nanoid } from 'nanoid';
import validator from 'validator';
import { PrismaClient } from '@prisma/client';
import { LENGTHS, RETURN_DATA, ID_STARTERS } from 'src/misc/parameterConstants';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';
import {
  AddClass,
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
import { AddDepartmentDTO, DeleteDepartmentDTO, Department, UpdateDepartmentDTO } from 'src/entity/department/department';
import { AddSchoolClassDTO, DeleteSchoolClassDTO, SchoolClass, UpdateSchoolClassDTO } from 'src/entity/school-class/schoolClass';
import { AddJoinCodeDTO, JoinCode } from 'src/entity/join-code/joinCode';
import { User } from 'src/entity/user/user';
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

  async addSchoolConfig(payload: AddSchoolDTO, request: Request): Promise<School> {
    const { schoolName, schoolDescription, schoolLanguageId, schoolTimezone } = payload;

    try {
      const jwt = await this.helper.extractJWTToken(request);
      const userUUID = await this.helper.getUserUUIDfromJWT(jwt);
      const school = await prisma.schools.create({
        data: {
          schoolUUID: `${ID_STARTERS.SCHOOL}${uuidv4()}`,
          schoolName,
          schoolDescription,
          schoolLanguageId,
          schoolTimezone,
          users: {
            connect: {
              userUUID,
            },
          },
          schoolUsers: {
            create: {
              users: {
                connect: {
                  userUUID,
                },
              },
            },
          },
          schoolUserRoles: {
            create: {
              users: {
                connect: {
                  userUUID,
                },
              },
              schoolRoles: {
                connect: {
                  schoolRoleId: 1,
                },
              },
            },
          },
        },
      });
      return new School(school);
    } catch (err) {
      console.log(err)
      throw new InternalServerErrorException('Database error');
    }
  }

  async addClass(payload: AddSchoolClassDTO): Promise<SchoolClass> {
    const { schoolClassDepartmentUUID, schoolClassName } = payload;

    try {
      const schoolClass = await prisma.schoolClasses.create({
        data: {
          schoolClassUUID: `${ID_STARTERS.CLASS}${uuidv4()}`,
          schoolClassName,
          departments: {
            connect: {
              departmentUUID: schoolClassDepartmentUUID,
            },
          }
        },
      });
      return new SchoolClass(schoolClass);
    } catch {
      throw new InternalServerErrorException("Database error");
    }
  }

  async removeClass(payload: DeleteSchoolClassDTO): Promise<number> {
    const { schoolClassUUID } = payload;
    try {
      await prisma.schoolClasses.delete({
        where: {
          schoolClassUUID,
        },
      });
      return 200;
    } catch {
      throw new InternalServerErrorException("Database error");
    }
  }

  async updateClass(payload: UpdateSchoolClassDTO): Promise<SchoolClass> {
    const { schoolClassUUID, schoolClassDepartmentUUID, schoolClassName } = payload;

    try {
      const schoolClass = await prisma.schoolClasses.update({
        where: {
          schoolClassUUID,
        },
        data: {
          schoolClassName,
          departments: {
            connect: {
              departmentUUID: schoolClassDepartmentUUID,
            },
          },
        },
      });
      return new SchoolClass(schoolClass);
    } catch {
      throw new InternalServerErrorException("Database error");
    }
  }

  async getClasses(schoolUUID: string, request: Request): Promise<SchoolClass[] | SchoolClass> {
    try {
      const schoolClasses = await prisma.schoolClasses.findMany({
        where: {
          departments: {
            schools: {
              schoolUUID,
            },
          },
        },
        include: {
          departments: true,
        }
      });

      return schoolClasses.map((schoolClass) => new SchoolClass({
        ...schoolClass,
        departments: new Department(schoolClass.departments),
      }));
    } catch {
      throw new InternalServerErrorException("Database error");
    }
  }

  async getDepartments(schoolUUID: string): Promise<Department[]> {
    try {
      const departments = await prisma.departments.findMany({
        where: {
          schools: {
            schoolUUID
          },
        },
      })

      return departments.map((department) => new Department(department));
    } catch {
      throw new InternalServerErrorException("Database error");
    }
  }

  async addDepartment(payload: AddDepartmentDTO, request: Request): Promise<Department> {
    const { departmentName, departmentAbbreviation, schoolUUID, departmentIsVisible, departmentChildsVisible, schoolClasses } = payload;

    try {
      const department = await prisma.departments.create({
        data: {
          departmentUUID: `${ID_STARTERS.DEPARTMENT}${uuidv4()}`,
          departmentName,
          departmentAbbreviation,
          departmentIsVisible,
          departmentChildsVisible,
          schools: {
            connect: {
              schoolUUID,
            },
          },
          schoolClasses: {
            create: schoolClasses.map((schoolClass) => {
              return {
                schoolClassUUID: `${ID_STARTERS.CLASS}${uuidv4()}`,
                schoolClassName: schoolClass,
              };
            }),
          }
        },
        include: {
          schoolClasses: true,
        }
      });
      return new Department({
        ...department,
        schoolClasses: department.schoolClasses.map((schoolClass) => new SchoolClass(schoolClass)),
      });
    } catch (err) {
      throw new InternalServerErrorException("Database error");
    }
  }

  async addDepartments(payload: AddDepartmentDTO[], request: Request): Promise<Department[]> {

    const departmentNames = payload.map((department) => department.departmentName);
    const uniqueDepartmentNames = [...new Set(departmentNames)];
    if (departmentNames.length !== uniqueDepartmentNames.length) {
      throw new BadRequestException("Department names must be unique");
    }

    try {
      const departments = [];
      for (const department of payload) {
        departments.push(new Department(await this.addDepartment(department, request)));
      }
      return departments;
    } catch {
      throw new InternalServerErrorException("Database error");
    }
  }

  async removeDepartment(payload: DeleteDepartmentDTO): Promise<number> {
    const { departmentUUID } = payload;
    try {
      await prisma.departments.delete({
        where: {
          departmentUUID
        },
      });
      return 200;
    } catch {
      throw new InternalServerErrorException("Database error");
    }
  }

  async updateDepartment(payload: UpdateDepartmentDTO): Promise<Department> {
    const { departmentUUID, departmentName, departmentChildsVisible, departmentIsVisible, departmentAbbreviation, schoolClasses } = payload;

    try {
      await prisma.schoolClasses.deleteMany({
        where: {
          departments: {
            departmentUUID
          },
        },
      })


      const department = await prisma.departments.update({
        where: {
          departmentUUID
        },
        data: {
          departmentName,
          departmentChildsVisible,
          departmentIsVisible,
          departmentAbbreviation,
          schoolClasses: {
            create: schoolClasses.map((schoolClass) => {
              return {
                schoolClassUUID: `${ID_STARTERS.CLASS}${uuidv4()}`,
                schoolClassName: schoolClass,
              };
            }),
          },
        },
        include: {
          schoolClasses: true,
        }
      });
      return new Department({
        ...department,
        schoolClasses: department.schoolClasses.map((schoolClass) => new SchoolClass(schoolClass)),
      });
    } catch (err) {
      throw new InternalServerErrorException("Database error");
    }
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

  async addJoinCode(payload: AddJoinCodeDTO, request: Request): Promise<JoinCode> {
    const { schoolUUID, joinCodeExpireTimestamp, joinCodeName } = payload;
    const jwt = await this.helper.extractJWTToken(request);
    const userUUID = await this.helper.getUserUUIDfromJWT(jwt);

    const schoolJoinCodes = await prisma.schoolJoinCodes.findMany({
      where: {
        schools: {
          schoolUUID,
        }
      },
    });

    if (schoolJoinCodes.length >= LENGTHS.MAX_JOIN_CODES) {
      throw new BadRequestException("Max join codes reached");
    }

    try {
      const joinCode = await prisma.schoolJoinCodes.create({
        data: {
          schools: {
            connect: {
              schoolUUID
            },
          },
          schoolJoinCodeName: joinCodeName,
          schoolJoinCode: await this.generateJoinCode(),
          schoolJoinCodeExpireTimestamp: new Date(joinCodeExpireTimestamp),
          users: {
            connect: {
              userUUID,
            },
          },
        },
        include: {
          users: true,
        }
      });

      return new JoinCode({
        ...joinCode,
        creator: new User(joinCode.users),
      });
    } catch {
      throw new InternalServerErrorException("Database error");
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
        schoolJoinCode: joinCode,
      },
    });

    if (!joinCodeData) {
      return RETURN_DATA.NOT_FOUND;
    }

    try {
      await prisma.schoolJoinCodes.update({
        where: {
          schoolJoinCode: joinCode,
        },
        data: {
          schoolJoinCodeName: joinCodeName,
          schoolJoinCodeExpireTimestamp: new Date(expireDate),
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
    const { personUUID, schoolUUID, roleId } = request.body;

    try {
      const personId = await this.helper.getUserIdByUUID(personUUID);
      const schoolId = await this.helper.getSchoolIdByUUID(schoolUUID);
      await prisma.schoolUserRoles.update({
        where: {
          user_school_unique: {
            userId: Number(personId),
            schoolId: Number(schoolId),
          },
        },
        data: {
          schoolRoleId: Number(roleId),
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
