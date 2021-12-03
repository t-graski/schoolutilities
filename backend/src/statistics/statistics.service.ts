import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Cron } from '@nestjs/schedule';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('mysql2');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const prisma = new PrismaClient();

@Injectable()
export class StatisticsService {
  constructor() {}

  // @Cron('18 * * * * *')
  async getStatistics() {
    console.log('Schools: ' + (await this.getSchoolAmount()));
    console.log('Users: ' + (await this.getUserAmount()));
    console.log('Courses: ' + (await this.getCourseAmount()));
    console.log(
      'Users joined last month: ' + (await this.usersJoinedLastXMonths(1)),
    );
    console.log(
      'Users without verified email: ' +
        (await this.userWithoutVerifiedEmail()),
    );
  }

  async getSchoolAmount() {
    return await prisma.schools.count();
  }

  async getUserAmount() {
    return await prisma.persons.count();
  }

  async getCourseAmount() {
    return await prisma.courses.count();
  }

  async usersJoinedLastXMonths(months: number) {
    const date = new Date();
    date.setMonth(date.getMonth() - months);
    return await prisma.persons.count({
      where: {
        creationDate: {
          gt: date,
        },
      },
    });
  }

  async userWithoutVerifiedEmail() {
    return await prisma.persons.count({
      where: {
        emailVerified: false,
      },
    });
  }

  async sentEmails() {
    return await prisma.emailLog.count();
  }
}
