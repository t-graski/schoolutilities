import * as fs from 'fs';
import * as moment from 'moment';
import { CourseEvent, GetEventsDto } from 'src/dto/events';
import {
  ERROR_CODES,
  ID_STARTERS,
  RETURN_DATA,
} from 'src/misc/parameterConstants';
import { HttpStatus, Injectable, NotAcceptableException, InternalServerErrorException } from '@nestjs/common';
import { ReturnMessage } from 'src/types/Course';
import { AuthService } from 'src/auth/auth.service';
import { CourseDto } from 'src/dto/course';
import { DatabaseService } from 'src/database/database.service';
import { HelperService } from 'src/helper/helper.service';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import { AddCourseDTO, AddCourseUserDTO, Course, DeleteCourseDTO, RemoveCourseUserDTO, UpdateCourseDTO } from 'src/entity/course/course';
import { Request } from 'express';
import { CourseUser } from 'src/entity/course-user/courseUser';
import { User } from 'src/entity/user/user';
let JSZip = require('jszip');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const prisma = new PrismaClient();

@Injectable()
export class CourseService {
  constructor(
    private readonly authService: AuthService,
    private readonly databaseService: DatabaseService,
    private readonly helper: HelperService,
  ) { }

  async addCourse(payload: AddCourseDTO, request: Request): Promise<Course> {
    const { courseName, courseDescription, schoolUUID, users, courseClasses } = payload;

    let userUUID;

    try {
      const token = await this.helper.extractJWTToken(request);
      userUUID = await this.helper.getUserUUIDfromJWT(token);
      users.push(userUUID);
    } catch (err) {
      throw new NotAcceptableException("Couldn't get user from token");
    }

    try {
      const courseData = await prisma.courses.create({
        data: {
          courseUUID: `${ID_STARTERS.COURSE}${uuidv4()}`,
          courseName,
          courseDescription,
          schools: {
            connect: {
              schoolUUID,
            }
          },
          schoolSubjects: {
            connect: {
              schoolSubjectId: Number(1400),
            }
          },
          users: {
            connect: {
              userUUID,
            }
          },
          courseUsers: {
            create: users.map((userUUID) => {
              return {
                users: {
                  connect: {
                    userUUID
                  }
                }
              }
            })
          },
          courseClasses: {
            create: courseClasses.map((classUUID) => {
              return {
                schoolClasses: {
                  connect: {
                    classUUID
                  }
                }
              }
            })
          }
        }
      });

      return new Course(courseData)
    } catch (err) {
      throw new InternalServerErrorException('Database error');
    }
  }

  async removeCourse(
    payload: DeleteCourseDTO,
  ): Promise<Course> {
    const { courseUUID } = payload;

    try {
      const course = await prisma.courses.delete({
        where: {
          courseUUID,
        },
      });
      return new Course(course);
    } catch (err) {
      throw new InternalServerErrorException('Database error');
    }
  }

  async updateCourse(payload: UpdateCourseDTO): Promise<Course> {
    const { courseUUID, courseName, courseDescription, users, courseClasses, schoolSubjectUUID } = payload;

    try {
      const updateCourse = await prisma.courses.update({
        where: { courseUUID },
        data: {
          courseName,
          courseDescription,
          schoolSubjects: {
            connect: {
              schoolSubjectUUID
            }
          }
        },
      });

      if (users) {
        await prisma.courseUsers.deleteMany({
          where: {
            courses: {
              courseUUID,
            },
          },
        });

        for (const user of users) {
          await prisma.courseUsers.create({
            data: {
              users: {
                connect: {
                  userUUID: user,
                }
              },
              courses: {
                connect: {
                  courseUUID,
                }
              }
            }
          });
        }
      }

      if (courseClasses) {
        await prisma.courseClasses.deleteMany({
          where: {
            courses: {
              courseUUID,
            },
          },
        });

        for (const courseClass of courseClasses) {
          await prisma.courseClasses.create({
            data: {
              schoolClasses: {
                connect: {
                  schoolClassUUID: courseClass,
                }
              },
              courses: {
                connect: {
                  courseUUID,
                }
              }
            }
          });
        }
      }
      return new Course(updateCourse);
    } catch (err) {
      throw new InternalServerErrorException('Database error');
    }
  }

  async removeUser(payload: RemoveCourseUserDTO): Promise<CourseUser> {
    const { courseUUID, userUUID } = payload;

    try {
      const courseUser = await prisma.courseUsers.deleteMany({
        where: {
          users: {
            userUUID,
          },
          courses: {
            courseUUID,
          },
        },
      });
      console.log(courseUser);

      return new CourseUser(courseUser);
    } catch {
      throw new InternalServerErrorException('Database error');
    }


  }

  async addUser(payload: AddCourseUserDTO, request: Request): Promise<CourseUser> {
    const jwt = await this.helper.extractJWTToken(request);
    const requesterId = await this.helper.getUserIdfromJWT(jwt);
    const { courseUUID, userUUID } = payload;

    try {
      const courseUser = await prisma.courseUsers.create({
        data: {
          users: {
            connect: {
              userUUID
            }
          },
          courses: {
            connect: {
              courseUUID
            }
          },
        },
        include: {
          users: true,
          courses: true,
        }
      });
      return new CourseUser(courseUser);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Database error');
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
