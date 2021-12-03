// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('mysql2');
import { Injectable } from '@nestjs/common';
import { DatabaseUpdate, ReturnMessage } from 'src/types/Database';
import { LoginUserData, RegisterUserData, UserData } from 'src/types/User';
import {
  LENGTHS,
  RETURN_DATA,
  PASSWORD,
  ID_STARTERS,
} from 'src/misc/parameterConstants';
import validator from 'validator';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
require('dotenv').config();

@Injectable()
export class DatabaseService {
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
      await prisma.persons.create({
        data: {
          personUUID: `${ID_STARTERS.USER}${uuidv4()}`,
          firstName,
          lastName,
          birthDate: new Date(birthDate),
          email,
          password,
        },
      });
    } catch (error) {
      return RETURN_DATA.DATABASE_ERORR;
    }
    return RETURN_DATA.SUCCESS;
  }

  async getUserRoles(userId: string): Promise<string[]> {
    if (!validator.isNumeric(userId)) {
      return [];
    }

    const roles = await prisma.personRoles.findMany({
      where: {
        personId: Number(userId),
      },
    });
    console.log(roles);
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

  async getSchoolIdByUUID(schoolUUID: string): Promise<number> {
    const school = await prisma.schools.findFirst({
      where: {
        schoolUUID: schoolUUID,
      },
      select: {
        schoolId: true,
      },
    });
    return school.schoolId;
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

  async insertToken(userId: number, token: string): Promise<DatabaseUpdate> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'insert into `login_tokens` set person_id=?, expire_date=ADDTIME(now(), "06:00:00"), token=?',
        [userId, token],
        function (error, results, fields) {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        },
      );
    });
  }

  async insertRegisterToken(userId, token: string): Promise<DatabaseUpdate> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'insert into `register_tokens` set person_id=?, token=?',
        [userId, token],
        function (error, results, fields) {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        },
      );
    });
  }

  async getUnverifiedUserByRegisterToken(token: string): Promise<number[]> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'select person_id from `persons` where person_id IN(select person_id from `register_tokens` where token=?) and email_verified=0',
        [token],
        function (error, results, fields) {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        },
      );
    });
  }

  async deleteRegisterToken(token: string): Promise<DatabaseUpdate> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'delete from `register_tokens` where token=?',
        [token],
        function (error, results, fields) {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        },
      );
    });
  }

  async activateAccount(token: string): Promise<DatabaseUpdate> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'update `persons` set email_verified=1 where person_id IN (select person_id from `register_tokens` where token=?)',
        [token],
        function (error, results, fields) {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        },
      );
    });
  }
}
