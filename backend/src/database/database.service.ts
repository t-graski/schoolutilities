import { HttpStatus, Injectable } from '@nestjs/common';
import { ReturnMessage } from 'src/types/Database';
import {
  LENGTHS,
  RETURN_DATA,
  PASSWORD,
  ID_STARTERS,
} from 'src/misc/parameterConstants';
import validator from 'validator';
import { v4 as uuidv4 } from 'uuid';
import { Prisma, PrismaClient } from '@prisma/client';
import { GetDepartments, UserPermissions } from 'src/types/SchoolAdmin';
import { Role } from 'src/roles/role.enum';
import { HelperService } from 'src/helper/helper.service';

const prisma = new PrismaClient();
require('dotenv').config();

@Injectable()
export class DatabaseService {
  constructor(private readonly helper: HelperService) { }

  async registerUser(body): Promise<ReturnMessage> {
    const { email, password, firstName, lastName, birthDate } = body;

    if (
      !validator.isEmail(email) ||
      !validator.isStrongPassword(password, PASSWORD) ||
      !validator.isLength(firstName, LENGTHS.PERSON_NAME) ||
      !validator.isLength(lastName, LENGTHS.PERSON_NAME) ||
      !(new Date(birthDate).getTime() > 0)
    ) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const isNotAvailable = await prisma.users.findFirst({
      where: {
        userEmail: email,
      },
    });
    if (isNotAvailable) {
      return RETURN_DATA.ALREADY_EXISTS;
    }

    try {
      let person = await prisma.users.create({
        data: {
          userUUID: `${ID_STARTERS.USER}${uuidv4()}`,
          userFirstname: firstName,
          userLastname: lastName,
          userBirthDate: new Date(birthDate),
          userEmail: email,
          userPassword: password,
          userLastLoginTimestamp: new Date(500),
        },
      });

      await this.helper.createOrResetDefaultSettings(person.userId);
      await this.helper.createDefaultPublicProfileSettings(person.userId);

    } catch (error) {
      console.log(error);

      return RETURN_DATA.DATABASE_ERROR;
    }
    return RETURN_DATA.SUCCESS;
  }

  async getUserRoles(userId: string): Promise<any> {
    if (!validator.isNumeric(userId)) {
      return [];
    }

    const roles = await prisma.schoolUserRoles.findMany({
      where: {
        userId: Number(userId),
      },
    });
    return roles;
  }

  async getUserData(body): Promise<any> {
    const { email } = body;
    const user = await prisma.users.findUnique({
      where: {
        userEmail: email,
      },
      select: {
        userId: true,
        userEmail: true,
        userPassword: true,
      },
    });
    return user;
  }

  async getUserIdByEmail(email: string): Promise<object> {
    const user = await prisma.users.findUnique({
      where: {
        userEmail: email,
      },
      select: {
        userId: true,
      },
    });
    return user;
  }

  async getPersonEmailByUUID(userUUID: string): Promise<string> {
    const user = await prisma.users.findFirst({
      where: {
        userUUID,
      },
      select: {
        userEmail: true,
      },
    });
    return user.userEmail;
  }

  async getUserDataById(userId: number): Promise<any> {
    const user = await prisma.users.findFirst({
      where: {
        userId,
      },
    });
    return user;
  }

  async getUserUUIDByEmail(email: string): Promise<string> {
    const user = await prisma.users.findUnique({
      where: {
        userEmail: email,
      },
    });
    return user.userUUID;
  }

  async getPersonByEmail(email: string): Promise<any> {
    const user = await prisma.users.findFirst({
      where: {
        userEmail: email,
      },
    });
    return user;
  }

  async getPersonById(userId: number): Promise<any> {
    const person = await prisma.users.findFirst({
      where: {
        userId,
      },
      select: {
        userId: true,
        userUUID: true,
        userFirstname: true,
        userLastname: true,
        userBirthDate: true,
        userEmail: true,
      },
    });

    return person;
  }

  async getSchoolUUIDByJoinCode(joinCode: string): Promise<string> {
    const schoolId = await prisma.schoolJoinCodes.findFirst({
      where: {
        schoolJoinCode: joinCode,
      },
      select: {
        schoolId: true,
      },
    });
    return this.getSchoolUUIDById(schoolId.schoolId);
  }

  async getSchoolById(schoolId: number): Promise<any> {
    const school = await prisma.schools.findFirst({
      where: {
        schoolId: schoolId,
      },
      select: {
        schoolId: true,
        schoolUUID: true,
        schoolName: true,
        schoolLanguageId: true,
        schoolTimezone: true,
      },
    });

    return school;
  }

  async getSchoolIdByUUID(schoolUUID: string): Promise<number> {
    const school = await prisma.schools.findFirst({
      where: {
        schoolUUID,
      },
      select: {
        schoolId: true,
      },
    });
    return school.schoolId;
  }

  async getSchoolUUIDById(schoolId: number): Promise<string> {
    const school = await prisma.schools.findFirst({
      where: {
        schoolId: Number(schoolId),
      },
    });
    return school.schoolUUID;
  }

  async getPersonIdByUUID(userUUID: string): Promise<number> {
    const user = await prisma.users.findFirst({
      where: {
        userUUID,
      },
      select: {
        userId: true,
      },
    });
    return user.userId;
  }

  async getDepartmentIdByUUID(departmentUUID: string): Promise<any> {
    const department = await prisma.departments.findFirst({
      where: {
        departmentUUID,
      },
      select: {
        departmentId: true,
      },
    });
    return department.departmentId;
  }

  async getClassIdByUUID(classUUID: string): Promise<any> {
    const classId = await prisma.schoolClasses.findFirst({
      where: {
        schoolClassUUID: classUUID,
      },
      select: {
        schoolClassId: true,
      },
    });
    return classId.schoolClassId;
  }
  async getCourseUUIDById(courseUUID: string): Promise<any> {
    const course = await prisma.courses.findFirst({
      where: {
        courseUUID: courseUUID,
      },
      select: {
        courseId: true,
      },
    });
    return course.courseId;
  }

  async getCourseIdByUUID(courseUUID: string): Promise<any> {
    const course = await prisma.courses.findFirst({
      where: {
        courseUUID: courseUUID,
      },
      select: {
        courseId: true,
      },
    });
    return course.courseId;
  }

  async getPersonRolesByPersonUUID(personUUID: string): Promise<any> {
    const personId = await this.getPersonIdByUUID(personUUID);

    let schools = await prisma.schoolUsers.findMany({
      where: {
        schoolUserId: personId,
      },
      select: {
        schoolId: true,
      },
    });

    let schoolRoles = [];
    for (const school of schools) {
      const role = await prisma.schoolUserRoles.findFirst({
        where: {
          userId: personId,
          schoolId: school.schoolId,
        },
        select: {
          schoolRoleId: true,
        },
      });

      let schoolUUID = await this.getSchoolUUIDById(school.schoolId);

      let roleName = Object.keys(Role)[role.schoolRoleId];
      let roleId = role.schoolRoleId;

      schoolRoles.push({
        schoolUUID,
        roleName,
        roleId
      });
    }

    return schoolRoles;
  }

  async getDepartments(body: GetDepartments): Promise<any> {
    const { schoolUUID } = body;
    if (!validator.isUUID(schoolUUID.slice(1), 4)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const schoolId = await this.getSchoolIdByUUID(schoolUUID);

    try {
      const departments = await prisma.departments.findMany({
        where: {
          schoolId: Number(schoolId),
        },
      });

      return {
        status: HttpStatus.OK,
        data: departments,
      };
    } catch (err) {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  async getClassById(classId: number): Promise<any> {
    const classData = await prisma.schoolClasses.findFirst({
      where: {
        schoolClassId: classId,
      },
      select: {
        schoolClassId: true,
        schoolClassUUID: true,
        schoolClassName: true,
        schoolClassDepartmentId: true,
      },
    });

    return classData;
  }

  // async insertToken1(userId: number, token: string): Promise<DatabaseUpdate> {
  //   return new Promise((resolve, reject) => {
  //     this.connection.query(
  //       'insert into `login_tokens` set person_id=?, expire_date=ADDTIME(now(), "06:00:00"), token=?',
  //       [userId, token],
  //       function (error, results, fields) {
  //         if (error) {
  //           reject(error);
  //         } else {
  //           resolve(results);
  //         }
  //       },
  //     );
  //   });
  // }

  async inserToken(userId: number, token: string) {
    prisma.userLoginTokens.create({
      data: {
        userId,
        refreshToken: token,
      },
    });

  }

  // async insertRegisterToken(userId, token: string): Promise<DatabaseUpdate> {
  //   return new Promise((resolve, reject) => {
  //     this.connection.query(
  //       'insert into `register_tokens` set person_id=?, token=?',
  //       [userId, token],
  //       function (error, results, fields) {
  //         if (error) {
  //           reject(error);
  //         } else {
  //           resolve(results);
  //         }
  //       },
  //     );
  //   });
  // }

  async inserRegisterToken(userId: number, token: string) {
    prisma.userRegisterTokens.create({
      data: {
        userId,
        userRegisterToken: token,
      },
    });
  }

  // async getUnverifiedUserByRegisterToken(token: string): Promise<number[]> {
  //   return new Promise((resolve, reject) => {
  //     this.connection.query(
  //       'select person_id from `persons` where person_id IN(select person_id from `register_tokens` where token=?) and email_verified=0',
  //       [token],
  //       function (error, results, fields) {
  //         if (error) {
  //           reject(error);
  //         } else {
  //           resolve(results);
  //         }
  //       },
  //     );
  //   });
  // }

  async getUnverifiedUserByRegisterToken(token: string) {
    return prisma.users.findMany({
      where: {
        userId: {
          in: (await prisma.userRegisterTokens.findMany({
            where: {
              userRegisterToken: token,
            },
          })).map((token) => token.userId),
        },
        userEmailVerified: false,
      },
    });
  }

  // async deleteRegisterToken(token: string): Promise<DatabaseUpdate> {
  //   return new Promise((resolve, reject) => {
  //     this.connection.query(
  //       'delete from `register_tokens` where token=?',
  //       [token],
  //       function (error, results, fields) {
  //         if (error) {
  //           reject(error);
  //         } else {
  //           resolve(results);
  //         }
  //       },
  //     );
  //   });
  // }

  async deleteRegisterToken(token: string) {
    prisma.userRegisterTokens.deleteMany({
      where: {
        userRegisterToken: token,
      },
    });
  }

  // async activateAccount(token: string): Promise<DatabaseUpdate> {
  //   return new Promise((resolve, reject) => {
  //     this.connection.query(
  //       'update `persons` set email_verified=1 where person_id IN (select person_id from `register_tokens` where token=?)',
  //       [token],
  //       function (error, results, fields) {
  //         if (error) {
  //           reject(error);
  //         } else {
  //           resolve(results);
  //         }
  //       },
  //     );
  //   });
  // }

  async activateAccount(token: string) {
    prisma.users.updateMany({
      where: {
        userId: {
          in: (await prisma.userRegisterTokens.findMany({
            where: {
              userRegisterToken: token,
            },
          })).map((token) => token.userId),
        },
      },
      data: {
        userEmailVerified: true,
      },
    });
  }
}
