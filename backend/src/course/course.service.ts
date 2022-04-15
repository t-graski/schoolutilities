import { HttpStatus, Injectable } from '@nestjs/common';
import {
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
import { HelperService } from 'src/helper/helper.service';
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
  async addCourse(request): Promise<ReturnMessage> {
    const { name, courseDescription, schoolUUID, persons, classes } =
      request.body;

    if (
      !name ||
      !courseDescription ||
      !schoolUUID ||
      !persons ||
      !classes ||
      !validator.isLength(name, LENGTHS.COURSE_NAME) ||
      !validator.isLength(courseDescription, LENGTHS.COURSE_DESCRIPTION)
    ) {
      return RETURN_DATA.INVALID_INPUT;
    }

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
    const {
      courseUUID,
      courseName,
      courseDescription,
      subjectId = 0,
      classes,
      persons,
    } = body;
    if (
      !courseName ||
      !courseDescription ||
      !persons ||
      !classes ||
      !validator.isUUID(courseUUID.slice(1), 4) ||
      !validator.isLength(courseName, LENGTHS.COURSE_NAME) ||
      !validator.isLength(courseDescription, LENGTHS.COURSE_DESCRIPTION)
    ) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const courseId = await this.helper.getCourseIdByUUID(courseUUID);

    const course = await prisma.courses.findUnique({
      where: {
        courseId: Number(courseId),
      },
    });

    if (!course) {
      return RETURN_DATA.NOT_FOUND;
    }

    const patchCourse = await prisma.courses.update({
      where: { courseId: Number(courseId) },
      data: {
        name: courseName,
        courseDescription: courseDescription,
        subjectId: Number(subjectId),
      },
    });

    if (persons) {
      for (let user of persons) {
        if (!validator.isUUID(user.slice(1), 4)) {
          return RETURN_DATA.INVALID_INPUT;
        }

        const userId = await this.helper.getUserIdByUUID(user);

        await prisma.coursePersons.create({
          data: {
            courses: {
              connect: {
                courseId: Number(courseId),
              },
            },
            persons: {
              connect: {
                personId: Number(userId),
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

        const classId = await this.helper.getClassIdByUUID(schoolClass);

        await prisma.courseClasses.create({
          data: {
            courses: {
              connect: {
                courseId: Number(courseId),
              },
            },
            schoolClasses: {
              connect: {
                classId: Number(classId),
              },
            },
          },
        });
      }
    }

    delete patchCourse.courseId;

    const schoolUUID = await this.helper.getSchoolUUIDById(
      patchCourse.schoolId,
    );

    const personCreationUUID = await this.helper.getUserUUIDById(
      patchCourse.personCreationId,
    );

    if (patchCourse) {
      return {
        status: HttpStatus.OK,
        data: {
          courseUUID: patchCourse.courseUUID,
          name: patchCourse.name,
          courseDescription: patchCourse.courseDescription,
          schoolUUID: schoolUUID,
          creationDate: patchCourse.creationDate,
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

    const courseData = [];
    try {
      const courses = await prisma.courses.findMany({
        where: {
          schoolId: Number(schoolId),
        },
        select: {
          courseId: true,
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

      if (!(await this.helper.userIsInCourse(personId, courseId)))
        return RETURN_DATA.FORBIDDEN;

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
        courseId: Number(courseId),
      },
      select: {
        elementId: true,
        elementUUID: true,
        typeId: true,
        parentId: true,
        visible: true,
        elementOrder: true,
        creationDate: true,
        personCreationId: true,
      },
    });

    const elementsWithOptions = [];

    for (let element of currentElements) {
      if (element.elementUUID) {
        const elementOptions = await this.helper.getElementOptions(
          element.elementId.toString(),
          element.typeId,
        );

        elementsWithOptions.push({
          elementUUID: element.elementUUID,
          elementId: element.elementId,
          parentId: element.parentId,
          elementOrder: element.elementOrder,
          creationDate: element.creationDate,
          personCreationId: element.personCreationId,
          elementOptions: {
            type: element.typeId.toString(),
            visible: element.visible.toString(),
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

            for (let option in elementWithOptions.elementOptions) {
              if (
                elementWithOptions.elementOptions[option] !==
                currentElement.elementOptions[option]
              ) {
                updateNeeded = true;
              }
            }

            if (updateNeeded) {
              let elementUpdate = await prisma.courseElements.update({
                where: {
                  elementId: Number(currentElement.elementId),
                },
                data: {
                  parentId: Number(currentElement.parentId),
                  visible: Boolean(currentElement.elementOptions.visible),
                  elementOrder: Number(currentElement.elementOrder),
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
                    let currentChild = {
                      elementUUID: child.elementUUID,
                      elementId: await this.helper.getElementIdByUUID(
                        child.elementUUID,
                      ),
                      parentId: currentElement.elementId,
                      elementOrder: child.elementOrder,
                      elementOptions: child.options,
                    };

                    let childWithOptions = elementsWithOptions.find(
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
                          elementId: Number(currentChild.elementId),
                        },
                        data: {
                          parentId: Number(currentChild.parentId),
                          visible: Boolean(currentChild.elementOptions.visible),
                          elementOrder: Number(currentChild.elementOrder),
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
                    data: courseElement,
                  });

                  await this.helper.createElementOptions(
                    child.options,
                    createdElement.elementId,
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
        let courseElement = {
          elementUUID: `${ID_STARTERS.COURSE_ELEMENT}${uuidv4()}`,
          courseId: Number(courseId),
          typeId: Number(element.options.type),
          parentId: element.parentUUID
            ? await this.helper.getElementIdByUUID(element.parentUUID)
            : 0,
          visible: Boolean(element.options.visible),
          elementOrder: element.elementOrder,
          personCreationId: Number(userId),
        };

        let createdElement = await prisma.courseElements.create({
          data: courseElement,
        });

        parentId = createdElement.elementId;

        await this.helper.createElementOptions(
          element.options,
          createdElement.elementId,
          Number(element.options.type),
        );

        if (element.children) {
          element.children.forEach(async (child) => {
            if (child.elementUUID) {
              if (await this.helper.elementExists(child.elementUUID)) {
                let currentChild = {
                  elementUUID: child.elementUUID,
                  elementId: await this.helper.getElementIdByUUID(
                    child.elementUUID,
                  ),
                  parentId: createdElement.elementId,
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
                      elementId: Number(currentChild.elementId),
                    },
                    data: currentChild,
                  });
                }

                await this.helper.updateElementOptions(
                  currentChild.elementOptions,
                  currentChild.elementId,
                  Number(currentChild.elementOptions.type),
                );
              }
            } else {
              let courseElement = {
                elementUUID: `${ID_STARTERS.COURSE_ELEMENT}${uuidv4()}`,
                courseId: Number(courseId),
                typeId: Number(child.options.type),
                parentId: parentId,
                visible: Boolean(child.options.visible),
                elementOrder: child.elementOrder,
                personCreationId: Number(userId),
              };

              let createdElement = await prisma.courseElements.create({
                data: courseElement,
              });

              await this.helper.createElementOptions(
                child.options,
                createdElement.elementId,
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
        courseId: Number(courseId),
      },
      select: {
        elementId: true,
        elementUUID: true,
        typeId: true,
        parentId: true,
        visible: true,
        creationDate: true,
        personCreationId: true,
      },
    });

    const elementsWithOptions = [];

    for (const element of currentElements) {
      if (element.elementUUID) {
        const elementOptions = await this.helper.getElementOptions(
          element.elementId.toString(),
          element.typeId,
        );

        let parentUUID = '0';
        if (element.parentId != 0) {
          parentUUID = await this.helper.getElementUUIDById(element.parentId);
        }

        elementsWithOptions.push({
          elementUUID: element.elementUUID,
          parentUUID: parentUUID,
          options: {
            type: element.typeId.toString(),
            visible: Boolean(element.visible),
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
}
