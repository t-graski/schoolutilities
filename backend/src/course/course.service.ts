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
import { AuthService } from 'src/auth/auth.service';
import { DatabaseService } from 'src/database/database.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('mysql2');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const prisma = new PrismaClient();

@Injectable()
export class CourseService {
  connection: any;
  constructor(
    private readonly authService: AuthService,
    private readonly databaseService: DatabaseService,
  ) {}
  async addCourse(body: AddCourse, token: string): Promise<ReturnMessage> {
    const { name, courseDescription, schoolUUID, persons, classes } = body;

    const jwt = await this.authService.decodeJWT(token);
    const personUUID = jwt.personUUID;

    if (
      !validator.isLength(name, LENGTHS.COURSE_NAME) ||
      !validator.isLength(courseDescription, LENGTHS.COURSE_DESCRIPTION)
    ) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const schoolId = await this.databaseService.getSchoolIdByUUID(schoolUUID);
    const personId = await (
      await this.authService.getPersonIdByUUID(personUUID)
    ).personId;

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
      const courseData = await prisma.courses.create({
        data: {
          courseUUID: `${ID_STARTERS.COURSE}${uuidv4()}`,
          name,
          courseDescription,
          schoolId: Number(schoolId),
          subjectId: 0,
          personCreationId: Number(personId),
        },
      });

      if (persons) {
        for (let person of persons) {
          if (!validator.isUUID(person.slice(1), 4)) {
            return RETURN_DATA.INVALID_INPUT;
          }

          const personId = await (
            await this.authService.getPersonIdByUUID(person)
          ).personId;

          await prisma.coursePersons.create({
            data: {
              courses: {
                connect: {
                  courseId: Number(courseData.courseId),
                },
              },
              persons: {
                connect: {
                  personId: Number(personId),
                },
              },
            },
          });
        }
      }

      if (classes) {
        for (let schoolClass of classes) {
          if (!validator.isUUID(schoolClass.slice(1), 4)) {
            return RETURN_DATA.INVALID_INPUT;
          }

          const schoolId = await this.databaseService.getClassIdByUUID(
            schoolClass,
          );

          await prisma.courseClasses.create({
            data: {
              courses: {
                connect: {
                  courseId: Number(courseData.courseId),
                },
              },
              schoolClasses: {
                connect: {
                  classId: Number(schoolId),
                },
              },
            },
          });
        }
      }

      delete courseData.courseId;
      delete courseData.schoolId;
      delete courseData.subjectId;

      return {
        status: RETURN_DATA.SUCCESS.status,
        data: courseData,
      };
    } catch (err) {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  async removeCourse(body: RemoveCourse): Promise<ReturnMessage> {
    const { courseUUID } = body;

    if (!validator.isUUID(courseUUID.slice(1), 4)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const courseId = await this.databaseService;

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
    const { courseId, name, courseDescription, subjectId } = body;
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

  async getAllCourses(
    schoolUUID: string,
    token: string,
  ): Promise<ReturnMessage> {
    if (!validator.isUUID(schoolUUID.slice(1), 4)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const jwt = await this.authService.decodeJWT(token);
    const personUUID = jwt.personUUID;

    const personId = await this.databaseService.getPersonIdByUUID(personUUID);
    const schoolId = await this.databaseService.getSchoolIdByUUID(schoolUUID);

    const personInSchool = await prisma.schoolPersons.findUnique({
      where: {
        schoolPersonId: {
          schoolId: Number(schoolId),
          personId: Number(personId),
        },
      },
    });

    if (!personInSchool) return RETURN_DATA.FORBIDDEN;

    const courseData = [];
    try {
      const courses = await prisma.courses.findMany({
        where: {
          schoolId: Number(schoolId),
        },
        select: {
          courseUUID: true,
          name: true,
          courseDescription: true,
          schoolId: true,
          creationDate: true,
          personCreationId: true,
        },
      });

      for (let course of courses) {
        const creator = await prisma.persons.findUnique({
          where: {
            personId: Number(course.personCreationId),
          },
          select: {
            personUUID: true,
            firstName: true,
            lastName: true,
          },
        });

        const courseDataItem = {
          courseUUID: course.courseUUID,
          courseName: course.name,
          courseDescription: course.courseDescription,
          creationDate: course.creationDate,
          creator: {
            personUUID: creator.personUUID,
            firstName: creator.firstName,
            lastName: creator.lastName,
          },
        };
        courseData.push(courseDataItem);
      }
      return {
        status: RETURN_DATA.SUCCESS.status,
        data: courseData,
      };
    } catch (err) {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  async getCourseInfo(
    courseUUID: string,
    token: string,
  ): Promise<ReturnMessage> {
    if (!validator.isUUID(courseUUID.slice(1), 4)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const jwt = await this.authService.decodeJWT(token);
    const personUUID = jwt.personUUID;

    const personId = await this.databaseService.getPersonIdByUUID(personUUID);
    const courseId = await this.databaseService.getCourseUUIDById(courseUUID);

    const personInCourse = await prisma.coursePersons.findUnique({
      where: {
        coursePersonId: {
          courseId: Number(courseId),
          personId: Number(personId),
        },
      },
    });

    if (!personInCourse) return RETURN_DATA.FORBIDDEN;

    const courseData = {};
    try {
      const course = await prisma.courses.findUnique({
        where: {
          courseId: Number(courseId),
        },
        select: {
          courseUUID: true,
          name: true,
          courseDescription: true,
          schoolId: true,
          creationDate: true,
          personCreationId: true,
        },
      });

      const creator = await prisma.persons.findUnique({
        where: {
          personId: Number(course.personCreationId),
        },
        select: {
          personUUID: true,
          firstName: true,
          lastName: true,
        },
      });

      const persons = await prisma.coursePersons.findMany({
        where: {
          courseId: Number(courseId),
        },
        select: {
          personId: true,
        },
      });

      const personsData = [];

      for (let person of persons) {
        const personData = await prisma.persons.findUnique({
          where: {
            personId: Number(person.personId),
          },
          select: {
            personUUID: true,
            firstName: true,
            lastName: true,
          },
        });
        personsData.push(personData);
      }

      const classes = await prisma.courseClasses.findMany({
        where: {
          courseId: Number(courseId),
        },
        select: {
          classId: true,
        },
      });

      const classesData = [];

      if (classes) {
        for (let schoolClass of classes) {
          const classData = await prisma.schoolClasses.findUnique({
            where: {
              classId: Number(schoolClass.classId),
            },
            select: {
              classUUID: true,
              className: true,
            },
          });
          classesData.push(classData);
        }
      }

      const courseDataItem = {
        courseUUID: course.courseUUID,
        courseName: course.name,
        courseDescription: course.courseDescription,
        creationDate: course.creationDate,
        creator: {
          personUUID: creator.personUUID,
          firstName: creator.firstName,
          lastName: creator.lastName,
        },
        persons: personsData,
        classes: classesData,
      };

      //add coursedata item to coursedata object
      courseData[courseDataItem.courseUUID] = courseDataItem;

      return {
        status: RETURN_DATA.SUCCESS.status,
        data: courseData,
      };
    } catch (error) {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }
}
