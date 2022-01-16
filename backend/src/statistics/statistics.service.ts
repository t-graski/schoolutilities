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

  // @Cron('15 * * * * *')
  async getStatistics() {
    // console.log('Schools: ' + (await this.getSchoolAmount()));
    // console.log('Users: ' + (await this.getUserAmount()));
    // console.log('Courses: ' + (await this.getCourseAmount()));
    // console.log(
    //   'Users joined last month: ' + (await this.usersJoinedLastXMonths(1)),
    // );
    // console.log(
    //   'Users without verified email: ' +
    //     (await this.userWithoutVerifiedEmail()),
    // );

    // go through all files in backend folder that end with .ts and sum the lines together
    const files = require('glob');
    const backendFiles = files.sync('../backend/src/**/*.ts');

    let lines = 0;
    backendFiles.forEach((file) => {
      let currentFile = require('fs')
        .readFileSync(file)
        .toString()
        .split('\n').length;
      lines += currentFile;
    });

    //do the same for frontend but ending with .tsx

    const componentFiles = files.sync('../frontend/components/*.tsx');
    let componentLines = 0;
    componentFiles.forEach((file) => {
      let currentFile = require('fs')
        .readFileSync(file)
        .toString()
        .split('\n').length;
      componentLines += currentFile;
    });

    const pagesFiles = files.sync('../frontend/pages/**/*.tsx');
    let pagesLines = 0;
    pagesFiles.forEach((file) => {
      let currentFile = require('fs')
        .readFileSync(file)
        .toString()
        .split('\n').length;
      pagesLines += currentFile;
    });

    //print lines, componentLines, pagesLines:
    //add them together
    //print each alone and the percentage of all lines
    console.log('Backend Lines: ' + lines);
    console.log('Frontend Component Lines: ' + componentLines);
    console.log('Frontend Pages Lines: ' + pagesLines);
    console.log('Total Lines: ' + (lines + componentLines + pagesLines));
    console.log(
      'Component Lines Percentage: ' +
        (
          (componentLines / (lines + componentLines + pagesLines)) *
          100
        ).toFixed(2) +
        '%',
    );
    console.log(
      'Pages Lines Percentage: ' +
        ((pagesLines / (lines + componentLines + pagesLines)) * 100).toFixed(
          2,
        ) +
        '%',
    );
    console.log(
      'Backend Lines Percentage: ' +
        ((lines / (lines + componentLines + pagesLines)) * 100).toFixed(2) +
        '%',
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
