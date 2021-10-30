import { HttpStatus, Injectable } from '@nestjs/common';
import {
  AddCourse,
  AddCourseReturnValue,
  UpdateCourse,
  AddUser,
  AddUserReturnValue,
  RemoveUser,
} from 'src/types/Course';
import { ReturnMessage } from 'src/types/SchoolAdmin';
import { PrismaClient } from '@prisma/client';
import validator from 'validator';
import { LENGTHS } from 'src/misc/parameterConstants';
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
      !validator.isLength(courseDescription, LENGTHS.COURSE_DESCRIPTION)
    ) {
      return {
        status: HttpStatus.NOT_ACCEPTABLE,
        message: 'Invalid input',
      };
    }

    const prismaData = await prisma.courses.create({
      data: {
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

    if (prismaData && prismaData.courseId) {
      return {
        status: HttpStatus.OK,
        message: 'Course added successfully',
        data: prismaData,
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Course not added',
      };
    }
  }

  async removeCourse(courseId: number): Promise<ReturnMessage> {
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

    const deleteCourse = await prisma.courses.delete({
      where: {
        courseId: Number(courseId),
      },
      select: {
        courseId: true,
        name: true,
      },
    });

    if (deleteCourse) {
      return {
        status: HttpStatus.OK,
        message: 'Course deleted successfully',
        data: deleteCourse,
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Course not deleted',
      };
    }
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

  async addUser(body: AddUser): Promise<AddUserReturnValue> {
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
