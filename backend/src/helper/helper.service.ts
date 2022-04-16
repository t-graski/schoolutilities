import { Injectable, Param } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { ERROR_CODES, ID_STARTERS } from 'src/misc/parameterConstants';
import validator from 'validator';
import { v4 as uuidv4 } from 'uuid';
//import parameter constants

const prisma = new PrismaClient();

@Injectable()
export class HelperService {
<<<<<<< HEAD
  constructor(private readonly jwtService: JwtService) { }
=======
  constructor(private readonly jwtService: JwtService) {}
>>>>>>> parent of 636a947 (merge)
  async getUserIdByUUID(userUUID: string): Promise<number> {
    if (userUUID && validator.isUUID(userUUID.slice(1), 4)) {
      try {
        const user = await prisma.persons.findFirst({
          where: {
            personUUID: userUUID,
          },
        });
        return user.personId;
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.USER_UUID_NULL_OR_INVALID);
    }
  }

  async getUserUUIDById(userId: number): Promise<string> {
    if (userId) {
      try {
        const user = await prisma.persons.findFirst({
          where: {
            personId: userId,
          },
        });
        return user.personUUID;
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.USER_ID_NULL_OR_INVALID);
    }
  }

  async getUserIdByEmail(email: string): Promise<number> {
    if (email && validator.isEmail(email)) {
      try {
        const user = await prisma.persons.findFirst({
          where: {
            email: email,
          },
        });
        return user.personId;
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.USER_EMAIL_NULL_OR_INVALID);
    }
  }

  async getUserById(userId: number): Promise<any> {
    if (userId) {
      try {
        const user = await prisma.persons.findFirst({
          where: {
            personId: userId,
          },
        });
        return user;
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.USER_ID_NULL_OR_INVALID);
    }
  }

  async getUserByUUID(userUUID: string): Promise<any> {
    if (userUUID && validator.isUUID(userUUID.slice(1), 4)) {
      try {
        const user = await prisma.persons.findFirst({
          where: {
            personUUID: userUUID,
          },
        });
        return user;
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.USER_UUID_NULL_OR_INVALID);
    }
  }

  async getUserByEmail(email: string): Promise<any> {
    if (email && validator.isEmail(email)) {
      try {
        const user = await prisma.persons.findFirst({
          where: {
            email: email,
          },
        });
        return user;
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.USER_EMAIL_NULL_OR_INVALID);
    }
  }

  async getSchoolsOfUser(userId: number, userUUID: string): Promise<any> {
    if (!userId || !userUUID) {
      throw new Error(ERROR_CODES.USER_ID_OR_UUID_NULL_OR_INVALID);
    }

    if (userUUID && validator.isUUID(userUUID.slice(1), 4)) {
      userId = await this.getUserIdByUUID(userUUID);
      try {
        const schools = await prisma.schoolPersons.findMany({
          where: {
            personId: userId,
          },
          select: {
            schoolId: true,
          },
        });
        const schoolData = [];

        for (const school of schools) {
          const schoolInfo = await this.getSchoolById(school.schoolId);
          schoolData.push(schoolInfo);
        }
        return schoolData;
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.USER_UUID_NULL_OR_INVALID);
    }
  }

  async getSchoolById(schoolId: number): Promise<any> {
    if (schoolId) {
      try {
        const school = await prisma.schools.findFirst({
          where: {
            schoolId: schoolId,
          },
        });
        return school;
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.SCHOOL_ID_NULL_OR_INVALID);
    }
  }

  async getSchoolUUIDById(schoolId: number): Promise<string> {
    if (schoolId) {
      try {
        const school = await prisma.schools.findFirst({
          where: {
            schoolId: schoolId,
          },
        });

        return school.schoolUUID;
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.SCHOOL_ID_NULL_OR_INVALID);
    }
  }

  async getSchoolIdByUUID(schoolUUID: string): Promise<number> {
    if (schoolUUID && validator.isUUID(schoolUUID.slice(1), 4)) {
      try {
        const school = await prisma.schools.findFirst({
          where: {
            schoolUUID: schoolUUID,
          },
        });
        return school.schoolId;
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.SCHOOL_UUID_NULL_OR_INVALID);
    }
  }

  /**
   * @brief Extracts the JWT token
   * @param request Request object
   * @returns JWT token or error message
   */

  async extractJWTToken(request): Promise<string> {
    try {
      return request.headers.authorization.split(' ')[1];
    } catch (err) {
      throw new Error(ERROR_CODES.NO_JWT_TOKEN_PROVIDED);
    }
  }

  async getUserUUIDfromJWT(token: string): Promise<string> {
    if (!token) throw new Error(ERROR_CODES.NO_JWT_TOKEN_PROVIDED);
    const payload = this.jwtService.verify(token);
    return payload.personUUID;
  }

  /**
   *
   * @param token JWT token
   * @returns User ID
   */
  async getUserIdfromJWT(token: string): Promise<number> {
    if (!token) throw new Error(ERROR_CODES.NO_JWT_TOKEN_PROVIDED);
    const personUUID = await this.getUserUUIDfromJWT(token);
    const userId = await this.getUserIdByUUID(personUUID);
    return userId;
  }

  /**
   * @param courseUUID Course UUID
   * @returns Course Id
   */

  async getCourseIdByUUID(courseUUID: string): Promise<number> {
    if (courseUUID && validator.isUUID(courseUUID.slice(1), 4)) {
      try {
        const course = await prisma.courses.findFirst({
          where: {
            courseUUID: courseUUID,
          },
        });
        return course.courseId;
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.USER_UUID_NULL_OR_INVALID);
    }
  }

<<<<<<< HEAD
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

  /**
   * 
=======
  /**
   *
>>>>>>> parent of 636a947 (merge)
   * @param elementId Element Id
   * @param typeId Type Id
   * Type 0: Headline
   * Type 1: Text
   * @returns Options of the given element
   */
<<<<<<< HEAD
  async getElementOptions(elementId: number, typeId): Promise<any> {
=======
  async getElementOptions(elementId: string, typeId): Promise<any> {
>>>>>>> parent of 636a947 (merge)
    try {
      // if (typeId || elementId
      //     && validator.isNumeric(elementId)
      // ) throw new Error(ERROR_CODES.ELEMENT_ID_OR_TYPE_ID_NULL_OR_INVALID);

      let options = {};

      switch (typeId) {
        //HEADLINE
        case 1:
          let headlineOptions = await prisma.headlineSettings.findFirst({
            where: {
              courseElementId: Number(elementId),
            },
          });
          options = {
            label: headlineOptions.label,
          };
          break;
        //TEXT
        case 2:
          let textOptions = await prisma.textSettings.findFirst({
            where: {
              courseElementId: Number(elementId),
            },
          });
          options = {
            text: textOptions.text,
          };
          break;
        //FILE SUBMISSION
        case 3:
          let fileOptions = await prisma.fileSubmissionSettings.findFirst({
            where: {
              courseElementId: Number(elementId),
            },
          });
          options = {
            name: fileOptions.name,
            description: fileOptions.description,
<<<<<<< HEAD
            dueDate: fileOptions.dueTime,
            submitLater: fileOptions.submitLater,
            submitLaterDate: fileOptions.submitLaterTime,
            maxFileSize: fileOptions.maxFileSize,
            allowedFileTypes: fileOptions.allowedFileTypes,
          }

=======
            dueTime: fileOptions.dueTime,
            submitLater: fileOptions.submitLater,
            submitLaterTime: fileOptions.submitLaterTime,
            maxFileSize: fileOptions.maxFileSize,
            fileTypes: fileOptions.allowedFileTypes,
          };
>>>>>>> parent of 636a947 (merge)
      }

      return options;
    } catch (err) {
      console.log(err);
<<<<<<< HEAD

=======
>>>>>>> parent of 636a947 (merge)
      throw new Error(ERROR_CODES.DATABASE_ERROR);
    }
  }

  async getElementIdByUUID(elementUUID: string): Promise<number> {
    if (elementUUID) {
      try {
        const element = await prisma.courseElements.findFirst({
          where: {
            elementUUID: elementUUID,
          },
        });
        return element.elementId;
      } catch (err) {
<<<<<<< HEAD
=======
        console.log(err);
>>>>>>> parent of 636a947 (merge)
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.ELEMENT_UUID_NULL_OR_INVALID);
    }
  }

  async getElementUUIDById(elementId: number): Promise<string> {
    if (elementId) {
      try {
        const element = await prisma.courseElements.findFirst({
          where: {
            elementId: elementId,
          },
        });
        return element.elementUUID;
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.ELEMENT_UUID_NULL_OR_INVALID);
    }
  }

  /**
   *
   * @param elementUUID Element UUID
   * @returns true if found, false if not found
   */
  async elementExists(elementUUID: string): Promise<boolean> {
    if (elementUUID) {
      try {
        const element = await prisma.courseElements.findFirst({
          where: {
            elementUUID: elementUUID,
          },
        });
        return element !== null;
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.ELEMENT_UUID_NULL_OR_INVALID);
    }
  }

  async createElement(element): Promise<any> {
    if (element) {
      try {
        const elementId = await prisma.courseElements.create({
          data: {
            elementUUID: `${ID_STARTERS.COURSE_ELEMENT}${uuidv4()}`,
            typeId: element.typeId,
            parentId: element.parentId,
            visible: element.visible,
            elementOrder: element.elementOrder,
            personCreationId: element.personCreationId,
            courseId: element.courseId,
<<<<<<< HEAD
          }
        });
        this.createElementOptions(element.options, elementId.elementId, element.typeId);
=======
          },
        });
        this.createElementOptions(
          element.options,
          elementId.elementId,
          element.typeId,
        );
>>>>>>> parent of 636a947 (merge)
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.ELEMENT_NULL);
    }
  }

<<<<<<< HEAD
  async updateElementOptions(options, elementId: number, typeId: number): Promise<any> {
=======
  async updateElementOptions(
    options,
    elementId: number,
    typeId: number,
  ): Promise<any> {
>>>>>>> parent of 636a947 (merge)
    if (options) {
      try {
        switch (typeId) {
          //HEADLINE
          case 1:
            await prisma.headlineSettings.update({
              where: {
                courseElementId: elementId,
              },
              data: {
                label: options.label,
              },
            });
            break;
          //TEXT
          case 2:
            await prisma.textSettings.update({
              where: {
                courseElementId: elementId,
              },
              data: {
                text: options.text,
              },
            });
            break;
          // FILE SUBMISSION
          case 3:
<<<<<<< HEAD
=======
            console.log(options);
>>>>>>> parent of 636a947 (merge)
            await prisma.fileSubmissionSettings.update({
              where: {
                courseElementId: elementId,
              },
              data: {
                name: options.name,
                description: options.description,
                dueTime: options.dueTime,
                submitLater: options.submitLater,
                submitLaterTime: options.submitLaterTime,
                maxFileSize: options.maxFileSize,
                allowedFileTypes: options.allowedFileTypes,
<<<<<<< HEAD

              }
=======
              },
>>>>>>> parent of 636a947 (merge)
            });
            break;
        }
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.ELEMENT_OPTIONS_NULL);
    }
  }

  /**
<<<<<<< HEAD
   * 
   * @param options Options of the element 
   * @param elementId Element Id
   * @param typeId Type Id 
   */
  async createElementOptions(options, elementId: number, typeId: number): Promise<any> {
=======
   *
   * @param options Options of the element
   * @param elementId Element Id
   * @param typeId Type Id
   */
  async createElementOptions(
    options,
    elementId: number,
    typeId: number,
  ): Promise<any> {
    console.log('asdfa');
>>>>>>> parent of 636a947 (merge)
    if (options) {
      try {
        switch (typeId) {
          //HEADLINE
          case 1:
            await prisma.headlineSettings.create({
              data: {
                label: options.label,
                courseElementId: elementId,
              },
            });
            break;
          //TEXT
          case 2:
            await prisma.textSettings.create({
              data: {
                text: options.text,
                courseElementId: elementId,
              },
            });
            break;
          // FILE SUBMISSION
          case 3:
<<<<<<< HEAD
=======
            console.log(options);
>>>>>>> parent of 636a947 (merge)
            await prisma.fileSubmissionSettings.create({
              data: {
                courseElementId: elementId,
                name: options.name,
                description: options.description,
                dueTime: options.dueTime,
                submitLater: options.submitLater,
                submitLaterTime: options.submitLaterTime,
                maxFileSize: options.maxFileSize,
                allowedFileTypes: options.allowedFileTypes,
<<<<<<< HEAD
              }
            });
        }
      } catch (err) {
=======
              },
            });
        }
      } catch (err) {
        console.log(err);
>>>>>>> parent of 636a947 (merge)
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.ELEMENT_OPTIONS_NULL);
    }
  }

  async deleteElement(elementId: number, typeId: number): Promise<any> {
    if (elementId) {
      try {
        await prisma.courseElements.delete({
          where: {
            elementId: elementId,
          },
        });
        await this.deleteElementOptions(elementId, Number(typeId));
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.ELEMENT_ID_NULL_OR_INVALID);
    }
  }

  async deleteElementOptions(elementId: number, typeId: number): Promise<any> {
    if (elementId) {
      try {
        switch (typeId) {
          //HEADLINE
          case 1:
            await prisma.headlineSettings.delete({
              where: {
                courseElementId: elementId,
              },
            });
            break;
          //TEXT
          case 2:
            await prisma.textSettings.delete({
              where: {
                courseElementId: elementId,
              },
            });
            break;
          // FILE SUBMISSION
          case 3:
            await prisma.fileSubmissionSettings.delete({
              where: {
                courseElementId: elementId,
              },
            });
        }
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.ELEMENT_ID_NULL_OR_INVALID);
    }
  }

<<<<<<< HEAD

=======
>>>>>>> parent of 636a947 (merge)
  async getClassIdByUUID(classUUID: string): Promise<any> {
    if (classUUID) {
      try {
        const classId = await prisma.schoolClasses.findFirst({
          where: {
            classUUID: classUUID,
          },
        });
        return classId.classId;
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.CLASS_UUID_NULL_OR_INVALID);
    }
  }

  async userIsInCourse(userId: number, courseId: number): Promise<any> {
    if (userId && courseId) {
      try {
        const userInCourse = await prisma.coursePersons.findFirst({
          where: {
            personId: userId,
            courseId: courseId,
          },
        });
        return userInCourse !== null;
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.USER_ID_NULL_OR_INVALID);
    }
  }

<<<<<<< HEAD
  async getMaxFileSize() {

  }
=======
  async getMaxFileSize() {}
>>>>>>> parent of 636a947 (merge)
}
