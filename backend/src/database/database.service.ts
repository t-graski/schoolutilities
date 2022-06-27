import { HttpStatus, Injectable } from '@nestjs/common';
import { ReturnMessage } from 'src/types/Database';
import { LoginUserData, RegisterUserData, UserData } from 'src/types/User';
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

  async registerUser(body: RegisterUserData): Promise<ReturnMessage> {
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

    const isNotAvailable = await prisma.persons.findFirst({
      where: {
        email,
      },
    });
    if (isNotAvailable) {
      return RETURN_DATA.ALREADY_EXISTS;
    }

    try {
      let person = await prisma.persons.create({
        data: {
          personUUID: `${ID_STARTERS.USER}${uuidv4()}`,
          firstName,
          lastName,
          birthDate: new Date(birthDate),
          email,
          password,
          lastLogin: new Date(500),
        },
      });

      await this.helper.createOrResetDefaultSettings(person.personId);
      await this.helper.createDefaultPublicProfileSettings(person.personId);

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

    const roles = await prisma.personRoles.findMany({
      where: {
        personId: Number(userId),
      },
    });
    return roles;
  }

  async getUserData(body: LoginUserData): Promise<UserData> {
    const { email } = body;
    const user = await prisma.persons.findUnique({
      where: {
        email: email,
      },
      select: {
        personId: true,
        email: true,
        password: true,
      },
    });
    return user;
  }

  async getUserIdByEmail(email: string): Promise<object> {
    const user = await prisma.persons.findUnique({
      where: {
        email: email,
      },
      select: {
        personId: true,
      },
    });
    return user;
  }

  async getPersonEmailByUUID(personUUID: string): Promise<string> {
    const person = await prisma.persons.findFirst({
      where: {
        personUUID: personUUID,
      },
      select: {
        email: true,
      },
    });
    return person.email;
  }

  async getUserDataById(userId: number): Promise<UserData> {
    const user = await prisma.persons.findFirst({
      where: {
        personId: userId,
      },
    });
    return user;
  }

  async getUserUUIDByEmail(email: string): Promise<string> {
    const user = await prisma.persons.findUnique({
      where: {
        email: email,
      },
    });
    return user.personUUID;
  }

  async getPersonByEmail(email: string): Promise<any> {
    const person = await prisma.persons.findFirst({
      where: {
        email: email,
      },
    });
    return person;
  }

  async getPersonById(personId: number): Promise<any> {
    const person = await prisma.persons.findFirst({
      where: {
        personId: personId,
      },
      select: {
        personId: true,
        personUUID: true,
        firstName: true,
        lastName: true,
        birthDate: true,
        email: true,
      },
    });
    return person;
  }

  async getPersonByUUID(personUUID: string): Promise<any> {
    const person = await prisma.persons.findFirst({
      where: {
        personUUID,
      },
      select: {
        personId: true,
        personUUID: true,
        firstName: true,
        lastName: true,
        birthDate: true,
        email: true,
      },
    });
    return person;
  }

  async getSchoolUUIDByJoinCode(joinCode: string): Promise<string> {
    const schoolId = await prisma.schoolJoinCodes.findFirst({
      where: {
        joinCode: joinCode,
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
        name: true,
        languageId: true,
        timezone: true,
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

  async getPersonIdByUUID(personUUID: string): Promise<number> {
    const person = await prisma.persons.findFirst({
      where: {
        personUUID: personUUID,
      },
      select: {
        personId: true,
      },
    });
    return person.personId;
  }

  async getDepartmentIdByUUID(departmentUUID: string): Promise<any> {
    const department = await prisma.departments.findFirst({
      where: {
        departmentUUID: departmentUUID,
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
        classUUID: classUUID,
      },
      select: {
        classId: true,
      },
    });
    return classId.classId;
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

    let schools = await prisma.schoolPersons.findMany({
      where: {
        personId: personId,
      },
      select: {
        schoolId: true,
      },
    });

    let schoolRoles = [];
    for (const school of schools) {
      const role = await prisma.personRoles.findFirst({
        where: {
          personId: personId,
          schoolId: school.schoolId,
        },
        select: {
          roleId: true,
        },
      });

      let schoolUUID = await this.getSchoolUUIDById(school.schoolId);

      let roleName = Object.keys(Role)[role.roleId];
      let roleId = role.roleId;

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
        classId: classId,
      },
      select: {
        classId: true,
        classUUID: true,
        className: true,
        departmentId: true,
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
    prisma.loginTokens.create({
      data: {
        personId: userId,
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
    prisma.registerTokens.create({
      data: {
        personId: userId,
        token: token,
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
    return prisma.persons.findMany({
      where: {
        personId: {
          in: (await prisma.registerTokens.findMany({
            where: {
              token: token,
            },
          })).map((token) => token.personId),
        },
        emailVerified: false,
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
    prisma.registerTokens.deleteMany({
      where: {
        token: token,
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
    prisma.persons.updateMany({
      where: {
        personId: {
          in: (await prisma.registerTokens.findMany({
            where: {
              token: token,
            },
          })).map((token) => token.personId),
        },
      },
      data: {
        emailVerified: true,
      },
    });
  }
}
