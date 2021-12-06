import { HttpStatus, Injectable } from '@nestjs/common';
import {
  AddCourse,
  UpdateCourse,
  RemoveCourse,
  AddUser,
  RemoveUser,
  ReturnMessage,
} from 'src/types/Course';
import { PrismaClient } from '@prisma/client';
import validator from 'validator';
import { LENGTHS, RETURN_DATA, ID_STARTERS } from 'src/misc/parameterConstants';
import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('mysql2');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const prisma = new PrismaClient();

@Injectable()
export class CourseService {
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
  async addCourse(body: AddCourse): Promise<ReturnMessage> {
    const { name, courseDescription, schoolId, subjectId, classId } = body;
    if (
      !validator.isLength(name, LENGTHS.COURSE_NAME) ||
      !validator.isLength(courseDescription, LENGTHS.COURSE_DESCRIPTION) ||
      !validator.isNumeric(schoolId) ||
      !validator.isNumeric(subjectId) ||
      !validator.isNumeric(classId)
    ) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const isNotAvailable = await prisma.courses.findFirst({
      where: {
        name,
        schoolId: Number(schoolId),
      },
    });

    if (isNotAvailable) {
      return RETURN_DATA.ALREADY_EXISTS;
    }

    try {
      await prisma.courses.create({
        data: {
          courseUUID: `${ID_STARTERS.COURSE}${uuidv4()}`,
          name,
          courseDescription: courseDescription,
          schools: {
            connect: {
              schoolId: Number(schoolId),
            },
          },
          subjects: {
            connect: {
              subjectId: Number(subjectId),
            },
          },
          schoolClasses: {
            connect: {
              classId: Number(classId),
            },
          },
        },
      });
    } catch (err) {
      return RETURN_DATA.DATABASE_ERROR;
    }
    return RETURN_DATA.SUCCESS;
  }

  async removeCourse(body: RemoveCourse): Promise<ReturnMessage> {
    const { courseId } = body;

    if (!validator.isNumeric(courseId)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const course = await prisma.courses.findUnique({
      where: {
        courseId: Number(courseId),
      },
    });

    if (!course) {
      return RETURN_DATA.NOT_FOUND;
    }

    try {
      await prisma.courses.delete({
        where: {
          courseId: Number(courseId),
        },
        select: {
          courseId: true,
          name: true,
        },
      });
    } catch (err) {
      return RETURN_DATA.DATABASE_ERROR;
    }
    return RETURN_DATA.SUCCESS;
  }

  async updateCourse(body: UpdateCourse): Promise<ReturnMessage> {
    const { courseId, name, courseDescription, subjectId, classId } = body;
    if (
      !validator.isLength(name, LENGTHS.COURSE_NAME) ||
      !validator.isLength(courseDescription, LENGTHS.COURSE_DESCRIPTION)
    ) {
      return {
        status: HttpStatus.NOT_ACCEPTABLE,
        message: 'Invalid input',
      };
    }

    const course: object | null = await prisma.courses.findUnique({
      where: {
        courseId: Number(courseId),
      },
    });

    if (!course) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Course not found',
      };
    }

    const patchCourse = await prisma.courses.update({
      where: { courseId: Number(courseId) },
      data: {
        name: name,
        courseDescription: courseDescription,
        subjectId: Number(subjectId),
        classId: Number(classId),
      },
    });
    if (patchCourse) {
      return {
        status: HttpStatus.OK,
        message: 'Course updated successfully',
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Course not updated',
      };
    }
  }

  async addUser(body: AddUser): Promise<ReturnMessage> {
    const { courseId, personId } = body;

    const courseUser: object | null = await prisma.coursePersons.findUnique({
      where: {
        coursePersonId: {
          courseId: Number(courseId),
          personId: Number(personId),
        },
      },
    });

    if (courseUser) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'User already exists',
      };
    }
    try {
      const prismaData = await prisma.coursePersons.create({
        data: {
          courseId: Number(courseId),
          personId: Number(personId),
        },
      });
    } catch (err) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'User not added',
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'User added successfully',
    };
  }

  async removeUser(body: RemoveUser): Promise<ReturnMessage> {
    const { courseId, personId } = body;
    const courseUser: object | null = await prisma.coursePersons.findUnique({
      where: {
        coursePersonId: {
          courseId: Number(courseId),
          personId: Number(personId),
        },
      },
    });
    if (!courseUser) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'User not found',
      };
    }
    const deleteCourseUser = await prisma.coursePersons.delete({
      where: {
        coursePersonId: {
          courseId: Number(courseId),
          personId: Number(personId),
        },
      },
    });
    if (deleteCourseUser) {
      return {
        status: HttpStatus.OK,
        message: 'User deleted successfully',
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'User not deleted',
      };
    }
  }
}
