import * as fs from 'fs';
import * as moment from 'moment';

import { CourseEvent, GetEventsDto } from 'src/dto/events';
import {
  ERROR_CODES,
  ID_STARTERS,
  RETURN_DATA,
} from 'src/misc/parameterConstants';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ReturnMessage, UpdateCourse } from 'src/types/Course';

import { AddCourseDto } from 'src/dto/addCourse';
import { AuthService } from 'src/auth/auth.service';
import { CourseDto } from 'src/dto/course';
import { DatabaseService } from 'src/database/database.service';
import { HelperService } from 'src/helper/helper.service';
import { PrismaClient } from '@prisma/client';
import { RemoveCourseDto } from 'src/dto/removeCourse';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';

let JSZip = require('jszip');
// import { GetEventsDto } from 'src/dto/getEvents';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const prisma = new PrismaClient();

@Injectable()
export class CourseService {
  connection: any;
  constructor(
    private readonly authService: AuthService,
    private readonly databaseService: DatabaseService,
    private readonly helper: HelperService,
  ) { }
  async addCourse(payload: AddCourseDto, request): Promise<ReturnMessage> {
    const { name, courseDescription, schoolUUID, persons, classes } = payload;

    let personUUID;

    try {
      const token = await this.helper.extractJWTToken(request);
      personUUID = await this.helper.getUserUUIDfromJWT(token);
    } catch (err) {
      return {
        status: HttpStatus.NOT_ACCEPTABLE,
        message: err.message,
      };
    }

    const [schoolId, userId] = await Promise.all([
      this.helper.getSchoolIdByUUID(schoolUUID),
      this.helper.getUserIdByUUID(personUUID),
    ]);

    try {
      const courseData = await prisma.courses.create({
        data: {
          courseUUID: `${ID_STARTERS.COURSE}${uuidv4()}`,
          courseName: name,
          courseDescription,
          schools: {
            connect: {
              schoolId: Number(schoolId),
            }
          },
          schoolSubjects: {
            connect: {
              schoolSubjectId: Number(1),
            }
          },
          users: {
            connect: {
              userId: Number(userId),
            }
          },
          courseUsers: {
            create: {
              userId,
            },
          },
        },
      });

      if (persons) {
        for (const person of persons) {
          if (!validator.isUUID(person.slice(1), 4)) {
            return RETURN_DATA.INVALID_INPUT;
          }

          const personId = await (
            await this.authService.getPersonIdByUUID(person)
          ).userId;

          await prisma.courseUsers.create({
            data: {
              courses: {
                connect: {
                  courseId: Number(courseData.courseId),
                },
              },
              users: {
                connect: {
                  userId: Number(personId),
                },
              },
            },
          });
        }
      }

      if (classes) {
        for (const schoolClass of classes) {
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
                  schoolClassId: Number(schoolId),
                },
              },
            },
          });
        }
      }

      delete courseData.courseId;
      delete courseData.courseSchoolId;
      delete courseData.courseSubjectId;
      delete courseData.courseCreatorId;

      return {
        status: RETURN_DATA.SUCCESS.status,
        data: courseData,
      };
    } catch (err) {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  async removeCourse(
    payload: RemoveCourseDto,
    request,
  ): Promise<ReturnMessage> {
    const { courseUUID } = payload;

    const courseId = await this.helper.getCourseIdByUUID(courseUUID);

    const course = await prisma.courses.findUnique({
      where: {
        courseId,
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
          courseName: true,
        },
      });
    } catch (err) {
      return RETURN_DATA.DATABASE_ERROR;
    }
    return RETURN_DATA.SUCCESS;
  }

  async updateCourse(body: UpdateCourse): Promise<ReturnMessage> {
    const {
      courseUUID,
      courseName,
      courseDescription,
      subjectId = 0,
      classes,
      persons,
    } = body;

    const courseId = await this.helper.getCourseIdByUUID(courseUUID);

    const course = await prisma.courses.findUnique({
      where: {
        courseId: Number(courseId),
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found: ' + courseUUID);
    }

    const patchCourse = await prisma.courses.update({
      where: { courseId: Number(courseId) },
      data: {
        courseName: courseName,
        courseDescription: courseDescription,
        courseSubjectId: Number(subjectId),
      },
    });

    if (persons) {
      const courseUsers = await this.helper.getCourseUsers(courseId);
      const courseUsersIds = courseUsers.map(
        (courseUser) => courseUser.personId,
      );
      for (let user of persons) {
        if (!validator.isUUID(user.slice(1), 4)) {
          return RETURN_DATA.INVALID_INPUT;
        }

        const userId = await this.helper.getUserIdByUUID(user);

        if (!courseUsersIds.includes(userId)) {
          await prisma.courseUsers.create({
            data: {
              courses: {
                connect: {
                  courseId: Number(courseId),
                },
              },
              users: {
                connect: {
                  userId,
                },
              },
            },
          });
        }

        if (courseUsersIds.includes(userId) && !persons.includes(user)) {
          await prisma.courseUsers.delete({
            where: {
              courseId_userId: {
                courseId: Number(courseId),
                userId,
              },
            },
          });
        }
      }
    }

    if (classes) {
      const courseClasses = await this.helper.getCourseClasses(courseId);
      const courseClassesIds = courseClasses.map(
        (courseClass) => courseClass.classId,
      );

      for (const schoolClass of classes) {
        if (!validator.isUUID(schoolClass.slice(1), 4)) {
          return RETURN_DATA.INVALID_INPUT;
        }

        const classId = await this.helper.getClassIdByUUID(schoolClass);

        if (!courseClassesIds.includes(classId)) {
          await prisma.courseClasses.create({
            data: {
              courses: {
                connect: {
                  courseId: Number(courseId),
                },
              },
              schoolClasses: {
                connect: {
                  schoolClassId: Number(classId),
                },
              },
            },
          });
        }

        if (
          courseClassesIds.includes(classId) &&
          !classes.includes(schoolClass)
        ) {
          await prisma.courseClasses.delete({
            where: {
              courseId_classId: {
                courseId: Number(courseId),
                classId: Number(classId),
              },
            },
          });
        }
      }
    }

    delete patchCourse.courseId;

    const schoolUUID = await this.helper.getSchoolUUIDById(
      patchCourse.courseSchoolId,
    );

    const personCreationUUID = await this.helper.getUserUUIDById(
      patchCourse.courseCreatorId,
    );

    if (patchCourse) {
      return {
        status: HttpStatus.OK,
        data: {
          courseUUID: patchCourse.courseUUID,
          courseName: patchCourse.courseName,
          courseDescription: patchCourse.courseDescription,
          schoolUUID: schoolUUID,
          courseCreationTimestamp: patchCourse.courseCreationTimestamp,
          personCreationUUID: personCreationUUID,
        },
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Course not updated',
      };
    }
  }

  async removeUser(request): Promise<ReturnMessage> {
    const jwt = await this.helper.extractJWTToken(request);
    const requesterId = await this.helper.getUserIdfromJWT(jwt);
    const { courseUUID, userUUID, schoolUUID } = request.body;
    const userId = await this.helper.getUserIdByUUID(userUUID);
    const schoolId = await this.helper.getSchoolIdByUUID(schoolUUID);

    if (!(await this.helper.userIdInSchool(requesterId, schoolId))) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        message: 'You are not part of this school',
      };
    }

    if (!(await this.helper.userIdInSchool(userId, schoolId))) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        message: 'User is not part of this school',
      };
    }

    const courseId = await this.helper.getCourseIdByUUID(courseUUID);
    const isTeacher = await this.helper.isTeacher(requesterId, schoolId);
    const isAdmin = await this.helper.isAdmin(requesterId, schoolId);

    if (isTeacher || isAdmin) {
      const courseUser = await prisma.courseUsers.findUnique({
        where: {
          courseId_userId: {
            courseId: Number(courseId),
            userId,
          },
        },
      });

      if (!courseUser) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
        };
      }

      const deleteCourseUser = await prisma.courseUsers.delete({
        where: {
          courseId_userId: {
            courseId: Number(courseId),
            userId,
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
    return {
      status: HttpStatus.UNAUTHORIZED,
      message: 'Unauthorized',
    };
  }

  async addUser(request): Promise<ReturnMessage> {
    const jwt = await this.helper.extractJWTToken(request);
    const requesterId = await this.helper.getUserIdfromJWT(jwt);
    const { courseUUID, userUUID, schoolUUID } = request.body;
    const userId = await this.helper.getUserIdByUUID(userUUID);
    const schoolId = await this.helper.getSchoolIdByUUID(schoolUUID);

    if (!(await this.helper.userIdInSchool(requesterId, schoolId))) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        message: 'You are not part of this school',
      };
    }

    if (!(await this.helper.userIdInSchool(userId, schoolId))) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        message: 'User is not part of this school',
      };
    }

    const courseId = await this.helper.getCourseIdByUUID(courseUUID);
    const isTeacher = await this.helper.isTeacher(requesterId, schoolId);
    const isAdmin = await this.helper.isAdmin(requesterId, schoolId);

    if (isTeacher || isAdmin) {
      const courseUser = await prisma.courseUsers.findUnique({
        where: {
          courseId_userId: {
            courseId: Number(courseId),
            userId,
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
        await prisma.courseUsers.create({
          data: {
            courseId: Number(courseId),
            userId: Number(userId),
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
    return {
      status: HttpStatus.UNAUTHORIZED,
      message: 'Unauthorized',
    };
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
    const isTeacherOrHigher = await this.helper.isTeacherOrHigher(
      personId,
      schoolId,
    );

    const courseData = [];
    try {
      const courses = await prisma.courses.findMany({
        where: {
          courseSchoolId: Number(schoolId),
        },
        select: {
          courseId: true,
          courseUUID: true,
          courseName: true,
          courseDescription: true,
          courseSchoolId: true,
          courseCreationTimestamp: true,
          courseCreatorId: true,
        },
      });

      for (let course of courses) {
        const creator = await prisma.users.findUnique({
          where: {
            userId: Number(course.courseCreatorId),
          },
          select: {
            userUUID: true,
            userFirstname: true,
            userLastname: true,
          },
        });

        const courseDataItem = {
          courseUUID: course.courseUUID,
          courseName: course.courseName,
          courseDescription: course.courseDescription,
          courseCreationTimestamp: course.courseCreationTimestamp,
          canEdit: isTeacherOrHigher,
          creator: {
            userUUID: creator.userUUID,
            firstName: creator.userFirstname,
            lastName: creator.userLastname,
          },
        };
        if (await this.helper.userIsInCourse(personId, course.courseId)) {
          courseData.push(courseDataItem);
        }
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
    const schoolId = await this.helper.getSchoolIdByCourseId(courseId);

    const isTeacherOrHigher = await this.helper.isTeacherOrHigher(
      personId,
      schoolId,
    );

    const courseData = {} as any;

    try {
      const course = await prisma.courses.findUnique({
        where: {
          courseId: Number(courseId),
        },
        select: {
          courseUUID: true,
          courseName: true,
          courseDescription: true,
          courseSchoolId: true,
          courseCreationTimestamp: true,
          courseCreatorId: true,
        },
      });

      if (!(await this.helper.userIsInCourse(personId, courseId)))
        return RETURN_DATA.FORBIDDEN;

      const creator = await prisma.users.findUnique({
        where: {
          userId: Number(course.courseCreatorId),
        },
        select: {
          userUUID: true,
          userFirstname: true,
          userLastname: true,
        },
      });

      const persons = await prisma.courseUsers.findMany({
        where: {
          courseId: Number(courseId),
        },
        select: {
          userId: true,
        },
      });

      const personsData = [];

      for (let person of persons) {
        const personData = await prisma.users.findUnique({
          where: {
            userId: Number(person.userId),
          },
          select: {
            userUUID: true,
            userFirstname: true,
            userLastname: true,
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
              schoolClassId: Number(schoolClass.classId),
            },
            select: {
              schoolClassUUID: true,
              schoolClassName: true,
            },
          });
          classesData.push(classData);
        }
      }

      const courseDataItem = {
        courseUUID: course.courseUUID,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        courseCreationTimestamp: course.courseCreationTimestamp,
        creator: {
          userUUID: creator.userUUID,
          firstName: creator.userFirstname,
          lastName: creator.userLastname,
        },
        persons: personsData,
        classes: classesData,
        canEdit: isTeacherOrHigher,
      };

      courseData[courseDataItem.courseUUID] = courseDataItem;

      return {
        status: RETURN_DATA.SUCCESS.status,
        data: courseData,
      };
    } catch (error) {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  async courseElements(request): Promise<ReturnMessage> {
    //try {
    const token = await this.helper.extractJWTToken(request);
    let { courseUUID, elements } = request.body;
    const courseId = await this.helper.getCourseIdByUUID(courseUUID);
    const userId = await this.helper.getUserIdfromJWT(token);

    for (const element of elements) {
      if (element.children) {
        for (const child of element.children) {
          child.parentUUID = element.elementUUID;
          child.elementOrder = element.children.indexOf(child) + 1;
          if (child.tag === 'deleted') {
            await this.helper.deleteElement(
              await this.helper.getElementIdByUUID(child.elementUUID),
              child.options.type,
            );
            if (element.children.length === 1) {
              delete element.children;
            } else {
              element.children = element.children.filter(
                (child) => child.elementUUID !== child.elementUUID,
              );
            }
          }
        }
        if (element.tag === 'deleted' && element.elementUUID != '') {
          await this.helper.deleteElement(
            await this.helper.getElementIdByUUID(element.elementUUID),
            element.options.type,
          );
          elements = elements.filter(
            (child) => child.elementUUID !== child.elementUUID,
          );
        }
      }
      element.elementOrder = elements.indexOf(element) + 1;
    }

    const currentElements = await prisma.courseElements.findMany({
      where: {
        courseElementCourseId: Number(courseId),
      },
      select: {
        courseElementId: true,
        courseElementUUID: true,
        courseElementTypeId: true,
        courseElementParentId: true,
        courseElementIsVisible: true,
        courseElementOrder: true,
        courseElementCreationTimestamp: true,
        courseElementCreatorId: true,
      },
    });

    const elementsWithOptions = [];

    for (let element of currentElements) {
      if (element.courseElementUUID) {
        const elementOptions = await this.helper.getElementOptions(
          element.courseElementId,
          element.courseElementTypeId,
        );

        elementsWithOptions.push({
          courseElementUUID: element.courseElementUUID,
          courseElementId: element.courseElementId,
          courseElementParentId: element.courseElementParentId,
          courseElementOrder: element.courseElementOrder,
          courseElementCreationTimestamp: element.courseElementCreationTimestamp,
          courseElementCreatorId: element.courseElementCreatorId,
          elementOptions: {
            type: element.courseElementTypeId.toString(),
            visible: element.courseElementIsVisible.toString(),
            ...elementOptions,
          },
        });
      }
    }

    elements.forEach(async (element) => {
      let parentId = 0;
      if (element.elementUUID) {
        if (await this.helper.elementExists(element.elementUUID)) {
          let currentElement = {
            elementUUID: element.elementUUID,
            elementId: await this.helper.getElementIdByUUID(
              element.elementUUID,
            ),
            parentId: 0,
            elementOrder: element.elementOrder,
            elementOptions: element.options,
          };

          let elementWithOptions = elementsWithOptions.find(
            (e) => e.elementUUID === element.elementUUID,
          );

          if (elementWithOptions) {
            let updateNeeded = false;

            if (
              elementWithOptions.parentId !== currentElement.parentId ||
              elementWithOptions.elementOrder !== currentElement.elementOrder
            ) {
              updateNeeded = true;
            }

            for (const option in elementWithOptions.elementOptions) {
              if (
                elementWithOptions.elementOptions[option] !==
                currentElement.elementOptions[option]
              ) {
                updateNeeded = true;
              }
            }

            if (updateNeeded) {
              const elementUpdate = await prisma.courseElements.update({
                where: {
                  courseElementId: Number(currentElement.elementId),
                },
                data: {
                  courseElementParentId: Number(currentElement.parentId),
                  courseElementIsVisible: Boolean(currentElement.elementOptions.visible),
                  courseElementOrder: Number(currentElement.elementOrder),
                },
              });

              await this.helper.updateElementOptions(
                currentElement.elementOptions,
                currentElement.elementId,
                Number(currentElement.elementOptions.type),
              );
            }

            if (element.children) {
              element.children.forEach(async (child) => {
                if (child.elementUUID) {
                  if (await this.helper.elementExists(child.elementUUID)) {
                    const currentChild = {
                      elementUUID: child.elementUUID,
                      elementId: await this.helper.getElementIdByUUID(
                        child.elementUUID,
                      ),
                      parentId: currentElement.elementId,
                      elementOrder: child.elementOrder,
                      elementOptions: child.options,
                    };

                    const childWithOptions = elementsWithOptions.find(
                      (e) => e.elementUUID === child.elementUUID,
                    );
                    let updateNeeded = false;

                    if (
                      childWithOptions.parentId !== currentChild.parentId ||
                      childWithOptions.elementOrder !==
                      currentChild.elementOrder
                    ) {
                      updateNeeded = true;
                    }

                    for (let option in childWithOptions.elementOptions) {
                      if (
                        childWithOptions.elementOptions[option] !==
                        currentChild.elementOptions[option]
                      ) {
                        updateNeeded = true;
                      }
                    }

                    if (updateNeeded) {
                      await prisma.courseElements.update({
                        where: {
                          courseElementId: Number(currentChild.elementId),
                        },
                        data: {
                          courseElementParentId: Number(currentChild.parentId),
                          courseElementIsVisible: Boolean(currentChild.elementOptions.visible),
                          courseElementOrder: Number(currentChild.elementOrder),
                        },
                      });

                      await this.helper.updateElementOptions(
                        currentChild.elementOptions,
                        currentChild.elementId,
                        Number(currentChild.elementOptions.type),
                      );
                    }
                  }
                } else {
                  let courseElement = {
                    elementUUID: `${ID_STARTERS.COURSE_ELEMENT}${uuidv4()}`,
                    courseId: Number(courseId),
                    typeId: Number(child.options.type),
                    parentId: child.parentUUID
                      ? await this.helper.getElementIdByUUID(child.parentUUID)
                      : 0,
                    visible: Boolean(child.options.visible),
                    elementOrder: child.elementOrder,
                    personCreationId: Number(userId),
                  };

                  let createdElement = await prisma.courseElements.create({
                    data: {
                      courseElementUUID: courseElement.elementUUID,
                      courses: {
                        connect: {
                          courseId: courseElement.courseId,
                        },
                      },
                      courseElementTypeId: courseElement.typeId,
                      courseElementParentId: courseElement.parentId,
                      courseElementIsVisible: courseElement.visible,
                      courseElementOrder: courseElement.elementOrder,
                      courseElementWeight: 0,
                      users: {
                        connect: {
                          userId: courseElement.personCreationId,
                        },
                      },
                    }
                  });

                  await this.helper.createElementOptions(
                    child.options,
                    createdElement.courseElementId,
                    Number(child.options.type),
                  );
                  return RETURN_DATA.SUCCESS;
                }
              });
            }
          }
        }
      } else {
        let parentId = 0;

        let createdElement = await prisma.courseElements.create({
          data: {
            courseElementUUID: `${ID_STARTERS.COURSE_ELEMENT}${uuidv4()}`,
            courses: {
              connect: {
                courseId: Number(courseId),
              },
            },
            courseElementTypeId: Number(element.options.type),
            courseElementParentId: element.parentUUID
              ? await this.helper.getElementIdByUUID(element.parentUUID)
              : 0,
            courseElementIsVisible: Boolean(element.options.visible),
            courseElementOrder: element.elementOrder,
            courseElementWeight: 0,
            users: {
              connect: {
                userId: Number(userId),
              },
            },
          }
        });

        parentId = createdElement.courseElementId;

        await this.helper.createElementOptions(
          element.options,
          createdElement.courseElementId,
          Number(element.options.type),
        );

        if (element.children) {
          element.children.forEach(async (child) => {
            if (child.elementUUID) {
              if (await this.helper.elementExists(child.elementUUID)) {
                let currentChild = {
                  courseElementUUID: child.elementUUID,
                  courseElementId: await this.helper.getElementIdByUUID(
                    child.elementUUID,
                  ),
                  parentId: createdElement.courseElementId,
                  elementOrder: child.elementOrder,
                  elementOptions: child.options,
                };

                let childWithOptions = elementsWithOptions.find(
                  (e) => e.elementUUID === child.elementUUID,
                );
                let updateNeeded = false;

                if (
                  childWithOptions.parentId !== currentChild.parentId ||
                  childWithOptions.elementOrder !== currentChild.elementOrder
                ) {
                  updateNeeded = true;
                }

                for (let option in childWithOptions.elementOptions) {
                  if (
                    childWithOptions.elementOptions[option] !==
                    currentChild.elementOptions[option]
                  ) {
                    updateNeeded = true;
                  }
                }

                if (updateNeeded) {
                  await prisma.courseElements.update({
                    where: {
                      courseElementId: Number(currentChild.courseElementId),
                    },
                    data: currentChild,
                  });
                }

                await this.helper.updateElementOptions(
                  currentChild.elementOptions,
                  currentChild.courseElementId,
                  Number(currentChild.elementOptions.type),
                );
              }
            } else {
              let courseElement = {
                courseElementUUID: `${ID_STARTERS.COURSE_ELEMENT}${uuidv4()}`,
                courseId: Number(courseId),
                courseElementTypeId: Number(child.options.type),
                courseElementParentId: parentId,
                courseElementIsVisible: Boolean(child.options.visible),
                courseElementOrder: child.elementOrder,
                courseElementCreatorId: Number(userId),
              };

              let createdElement = await prisma.courseElements.create({
                data: {
                  courseElementUUID: courseElement.courseElementUUID,
                  courses: {
                    connect: {
                      courseId: courseElement.courseId,
                    },
                  },
                  courseElementTypeId: courseElement.courseElementTypeId,
                  courseElementParentId: courseElement.courseElementParentId,
                  courseElementIsVisible: courseElement.courseElementIsVisible,
                  courseElementOrder: courseElement.courseElementOrder,
                  courseElementWeight: 0,
                  users: {
                    connect: {
                      userId: courseElement.courseElementCreatorId,
                    },
                  },
                }
              });

              await this.helper.createElementOptions(
                child.options,
                createdElement.courseElementCourseId,
                Number(child.options.type),
              );
            }
          });
        }
        return RETURN_DATA.SUCCESS;
      }
    });
    return RETURN_DATA.SUCCESS;
  }

  async getCourseElements(courseUUID): Promise<ReturnMessage> {
    const courseId = await this.helper.getCourseIdByUUID(courseUUID);

    const currentElements = await prisma.courseElements.findMany({
      where: {
        courseElementCourseId: Number(courseId),
      },
      select: {
        courseElementId: true,
        courseElementUUID: true,
        courseElementTypeId: true,
        courseElementParentId: true,
        courseElementIsVisible: true,
        courseElementCreatorId: true,
      },
    });

    const elementsWithOptions = [];

    for (const element of currentElements) {
      if (element.courseElementUUID) {
        const elementOptions = await this.helper.getElementOptions(
          element.courseElementId,
          element.courseElementTypeId,
        );

        let parentUUID = '0';
        if (element.courseElementParentId != 0) {
          parentUUID = await this.helper.getElementUUIDById(element.courseElementParentId);
        }

        elementsWithOptions.push({
          elementUUID: element.courseElementUUID,
          parentUUID: parentUUID,
          options: {
            type: Number(element.courseElementTypeId),
            visible: Boolean(element.courseElementIsVisible),
            ...elementOptions,
          },
        });
      }
    }

    let returnElements = elementsWithOptions.filter(
      (element) => !element.parentUUID || element.parentUUID === '0',
    );

    for (const element of elementsWithOptions) {
      if (element.parentUUID && element.parentUUID !== '0') {
        returnElements = returnElements.map((currentElement) => {
          if (currentElement.elementUUID === element.parentUUID) {
            if (!currentElement.children) {
              currentElement.children = [];
            }
            currentElement.children.push(element);
          }

          return currentElement;
        });
        delete element.parentUUID;
      }
    }

    return {
      status: RETURN_DATA.SUCCESS.status,
      data: returnElements,
    };
  }

  async getElement(request, elementUUID): Promise<ReturnMessage> {
    const jwt = await this.helper.extractJWTToken(request);
    const userId = await this.helper.getUserIdfromJWT(jwt);
    const elementId = await this.helper.getElementIdByUUID(elementUUID);
    const courseId = await this.helper.getCourseIdByElementId(elementId);
    const schoolId = await this.helper.getSchoolIdByCourseId(courseId);

    if (!(await this.helper.userIsInCourse(userId, courseId))) {
      return {
        status: HttpStatus.FORBIDDEN,
        message: 'You are not in this course',
      };
    }

    const settings = await prisma.courseElements.findFirst({
      where: {
        courseElementId: elementId,
      },
      include: {
        courses: true,
        courseFileSubmissionSettings: true,
        courseElementTextSettings: true,
      }
    });

    const creator = await this.helper.getUserById(settings.courseElementCreatorId);
    const isTeacherOrHigher = await this.helper.isTeacherOrHigher(
      userId,
      schoolId,
    );

    const hasSubmitted = await prisma.courseFileSubmissions.findFirst({
      where: {
        courseFileSubmissionElementId: Number(elementId),
        userId: Number(userId),
      },
    });

    let evaluation;

    let evaluationData = await prisma.courseFileSubmissionGrades.findUnique({
      where: {
        courseElementId_userId: {
          courseElementId: Number(elementId),
          userId: Number(userId),
        },
      }
    })

    if (evaluationData) {
      evaluation = {
        grade: evaluationData.courseFileSubmissionGrade,
        notes: evaluationData.courseFileSubmissionGradeNotes,
      }
    } else {
      evaluation = {
        grade: -1,
        notes: "",
      }
    }

    const elementItem = {
      courseElementUUID: settings.courseElementUUID,
      courseUUID: settings.courses!.courseUUID,
      courseElementIsVisible: Boolean(settings.courseElementIsVisible),
      courseElementCreationTimestamp: settings.courseElementCreationTimestamp,
      canEdit: isTeacherOrHigher,
      ...evaluation,
      hasSubmitted: hasSubmitted ? true : false,
      creator: {
        userUUID: creator.personUUID,
        firstName: creator.firstName,
        lastName: creator.lastName,
        fullName: `${creator.firstName} ${creator.lastName}`,
      },
      options: {
        type: settings.courseElementTypeId,
        ...(settings.courseElementTextSettings || settings.courseFileSubmissionSettings),
      },
    };

    return {
      status: RETURN_DATA.SUCCESS.status,
      data: elementItem,
    };
  }

  async getCourseUUIDById(courseId: number): Promise<string> {
    if (courseId) {
      try {
        const course = await prisma.courses.findFirst({
          where: {
            courseId: courseId,
          },
        });
        return course.courseUUID;
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.SCHOOL_ID_NULL_OR_INVALID);
    }
  }

  async submitExercise(request, file): Promise<ReturnMessage> {
    const elementUUID = request.body.elementUUID;
    const elementId = await this.helper.getElementIdByUUID(elementUUID);
    const jwt = await this.helper.extractJWTToken(request);
    const userId = await this.helper.getUserIdfromJWT(jwt);
    const dueDate = await this.helper.getElementDueDate(elementId);
    const isSubmittedInTime = moment(new Date(Date.now())).isAfter(dueDate);

    const hasSubmitted = await prisma.courseFileSubmissions.findFirst({
      where: {
        userId: Number(userId),
        courseFileSubmissionElementId: Number(elementId),
      },
    });

    if (hasSubmitted) {
      return {
        status: HttpStatus.FORBIDDEN,
        message: 'You have already submitted this exercise',
      };
    }

    console.log(file);

    try {
      await prisma.courseFileSubmissions.create({
        data: {
          courseFileSubmissionFileName: file.filename,
          courseFileSubmissionOriginalName: file.originalname,
          courseFileSubmissionFileSize: file.size,
          courseFileSubmissionFileType: file.mimetype,
          courseFileSubmissionIsSubmittedLate: !isSubmittedInTime,
          users: {
            connect: {
              userId: Number(userId),
            },
          },
          courseElements: {
            connect: {
              courseElementId: Number(elementId),
            },
          },
        }
      });

      return RETURN_DATA.SUCCESS;
    } catch (error) {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  async getSubmissions(request, elementUUID): Promise<ReturnMessage> {
    const elementId = await this.helper.getElementIdByUUID(elementUUID);
    const jwt = await this.helper.extractJWTToken(request);
    const userId = await this.helper.getUserIdfromJWT(jwt);
    const courseId = await this.helper.getCourseIdByElementId(elementId);

    if (!(await this.helper.userIsInCourse(userId, courseId))) {
      return {
        status: HttpStatus.FORBIDDEN,
        message: 'You are not in this course',
      };
    }

    const submissions = await prisma.courseFileSubmissions.findMany({
      where: {
        courseFileSubmissionElementId: Number(elementId),
      },
    });

    const courseUsers = await this.helper.getCourseUsers(courseId);
    const userSubmissions = [];

    for (const user of courseUsers) {
      const userSubmissionItem = {
        userUUID: user.personUUID,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.firstName + ' ' + user.lastName,
        submission: {} as any,
      };

      const userSubmission = submissions.find((submission) => {
        return submission.userId === user.personId;
      });

      let submissionItem = {} as any;

      if (userSubmission) {
        submissionItem.courseFileSubmissionFileName = userSubmission.courseFileSubmissionFileName;
        submissionItem.courseFileSubmissionFileSize = userSubmission.courseFileSubmissionFileSize;
        submissionItem.courseFileSubmissionFileType = userSubmission.courseFileSubmissionFileType;
        submissionItem.courseFileSubmissionIsSubmittedLate = userSubmission.courseFileSubmissionIsSubmittedLate;
        // submissionItem.notes = userSubmission.notes;
        // submissionItem.grade = userSubmission.grade;
        submissionItem.courseFileSubmissionUploadTimestamp = userSubmission.courseFileSubmissionUploadTimestamp;
        submissionItem.download = `${process.env.BACKEND_URL}/api/assets/submissions/${userSubmission.courseFileSubmissionFileName}`;
      } else {
        submissionItem = null;
      }
      userSubmissionItem.submission = submissionItem;
      userSubmissions.push(userSubmissionItem);
    }

    return {
      status: RETURN_DATA.SUCCESS.status,
      data: userSubmissions,
    };
  }

  async getEvents(payload: GetEventsDto, request): Promise<ReturnMessage> {
    const { schoolUUID, days } = payload;
    const jwt = await this.helper.extractJWTToken(request);
    const userId = await this.helper.getUserIdfromJWT(jwt);

    let courses = await prisma.schools.findFirst({
      where: {
        schoolUUID,
      },
      select: {
        schoolUUID: true,
        schoolName: true,
        courses: {
          where: {
            courseUsers: {
              some: {
                userId: Number(userId),
              },
            },
          },
          select: {
            courseUUID: true,
            courseName: true,
            courseElements: {
              where: {
                courseElementTypeId: {
                  equals: 3,
                },
                AND: {
                  courseElementIsVisible: true,
                },
              },
              select: {
                courseElementUUID: true,
                courseElementCreationTimestamp: true,
                courseElementOrder: true,
                courseElementIsVisible: true,
                courseFileSubmissionSettings: {
                  where: {
                    courseFileSubmissionDueTimestamp: {
                      lte: moment(new Date(Date.now()))
                        .add(days, 'days')
                        .toDate(),
                    },
                    AND: {
                      courseFileSubmissionDueTimestamp: {
                        gte: moment(new Date(Date.now())).toDate(),
                      },
                    },
                  },
                  select: {
                    courseFileSubmissionName: true,
                    courseFileSubmissionDescription: true,
                    courseFileSubmissionDueTimestamp: true,
                    courseFileSubmissionSubmitLater: true,
                    courseFileSubmissionSubmitLaterTimestamp: true,
                    courseFileSubmissionMaxFileSize: true,
                    courseFileSubmissionAllowedFileTypes: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const eventItems: CourseEvent[] = [];

    for (const course of courses.courses) {
      if (course.courseElements.length != 0) {
        for (const element of course.courseElements) {
          if (element.courseFileSubmissionSettings.length != 0) {
            eventItems.push({
              schoolUUID: courses.schoolUUID,
              schoolName: courses.schoolName,
              courseUUID: course.courseUUID,
              courseName: course.courseName,
              courseElementUUID: element.courseElementUUID,
              courseFileSubmissionName: element.courseFileSubmissionSettings[0].courseFileSubmissionName,
              courseFileSubmissionDescription: element.courseFileSubmissionSettings[0].courseFileSubmissionDescription,
              courseFileSubmissionDueTimestamp: element.courseFileSubmissionSettings[0].courseFileSubmissionDueTimestamp,
              courseFileSubmissionSubmitLater: element.courseFileSubmissionSettings[0].courseFileSubmissionSubmitLater,
              courseFileSubmissionSubmitLaterTimestamp:
                element.courseFileSubmissionSettings[0].courseFileSubmissionSubmitLaterTimestamp,
              courseFileSubmissionMaxFileSize: element.courseFileSubmissionSettings[0].courseFileSubmissionMaxFileSize,
              courseFileSubmissionAllowedFileTypes:
                element.courseFileSubmissionSettings[0].courseFileSubmissionAllowedFileTypes,
            });
          }
        }
      }
    }

    return {
      status: RETURN_DATA.SUCCESS.status,
      data: eventItems,
    };
  }

  async revertExercise(request, elementUUID): Promise<ReturnMessage> {
    const jwt = await this.helper.extractJWTToken(request);
    const userId = await this.helper.getUserIdfromJWT(jwt);
    const elementId = await this.helper.getElementIdByUUID(elementUUID);
    try {
      await prisma.courseFileSubmissions.delete({
        where: {
          courseFileSubmissionElementId_userId: {
            courseFileSubmissionElementId: Number(elementId),
            userId: Number(userId),
          },
        },
      });
      return RETURN_DATA.SUCCESS;
    } catch (error) {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  async downloadAll(params, request): Promise<ReturnMessage> {
    const { elementUUID } = params;
    const zip = new JSZip();

    const files = await prisma.courseElements.findFirst({
      where: {
        courseElementUUID: elementUUID,
      },
      select: {
        courseFileSubmissions: {
          select: {
            courseFileSubmissionFileName: true,
          },
        },
      },
    });

    const zipFolder = zip.folder(elementUUID);

    files.courseFileSubmissions.forEach((file) => {
      console.log(`${process.env.FILE_PATH}${file.courseFileSubmissionFileName}`);

      zipFolder.file(
        file.courseFileSubmissionFileName,
        fs.readFileSync(`${process.env.FILE_PATH}${file.courseFileSubmissionFileName}`),
      );
    });

    return {
      status: RETURN_DATA.SUCCESS.status,
      data: zipFolder,
    };
  }
}

export async function findOneByUUID(courseUUID: string): Promise<CourseDto | any> {
  try {
    const course = await prisma.courses.findFirst({
      where: {
        courseUUID,
      },
    });
    return course;
  } catch {
    return null;
  }
}
export async function findOneByName(
  courseName: string,
  schoolUUID,
): Promise<CourseDto | any> {
  try {
    const courseUUID = await prisma.schools.findFirst({
      where: {
        schoolUUID,
      },
      select: {
        schoolId: true,
        courses: {
          where: {
            courseName,
          },
          select: {
            courseId: true,
            courseSchoolId: true,
            courseUUID: true,
            courseName: true,
            courseDescription: true,
            courseCreationTimestamp: true,
            courseCreatorId: true,
          },
        },
      },
    });
    return courseUUID.courses[0] ? courseUUID.courses[0] : null;
  } catch {
    return null;
  }
}
