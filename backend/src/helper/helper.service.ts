import * as moment from 'moment-timezone';

import {
  ERROR_CODES,
  ID_STARTERS,
  PASSWORD,
  RETURN_DATA,
} from 'src/misc/parameterConstants';
import { Injectable, NotFoundException, Param } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { RFC5646_LANGUAGE_TAGS } from 'src/misc/rfc5654';
import { Role } from 'src/roles/role.enum';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';

//import parameter constants

const prisma = new PrismaClient();

@Injectable()
export class HelperService {
  constructor(private readonly jwtService: JwtService) { }

  async getUserIdByUUID(userUUID: string): Promise<number> {
    if (userUUID && validator.isUUID(userUUID.slice(1), 4)) {
      try {
        const user = await prisma.users.findFirst({
          where: {
            userUUID,
          },
        });
        return user.userId;
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
        const user = await prisma.users.findFirst({
          where: {
            userId,
          },
        });
        return user.userUUID;
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.USER_ID_NULL_OR_INVALID);
    }
  }

  async getArticleIdByUUID(articleUUID: string): Promise<number> {
    if (articleUUID && validator.isUUID(articleUUID.slice(1), 4)) {
      try {
        const article = await prisma.articles.findFirst({
          where: {
            articleUUID: articleUUID,
          },
        });
        return article.articleId;
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.ARTICLE_UUID_NULL_OR_INVALID);
    }
  }

  async getElementDueDate(elementId: number): Promise<any> {
    const element = await prisma.courseElements.findFirst({
      where: {
        courseElementId: elementId,
      },
    });
    if (element.courseElementTypeId == 3) {
      const fileSubmissionSettings =
        await prisma.courseFileSubmissionSettings.findFirst({
          where: {
            courseFileSubmissionElementId: elementId,
          },
        });
      return fileSubmissionSettings.courseFileSubmissionDueTimestamp;
    }
  }

  async getUserIdByEmail(email: string): Promise<number> {
    if (email && validator.isEmail(email)) {
      try {
        const user = await prisma.users.findFirst({
          where: {
            userEmail: email,
          },
        });
        return user.userId;
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
        const user = await prisma.users.findFirst({
          where: {
            userId,
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
        const user = await prisma.users.findFirst({
          where: {
            userUUID,
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
        const user = await prisma.users.findFirst({
          where: {
            userEmail: email,
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
        const schools = await prisma.schoolUserRoles.findMany({
          where: {
            userId,
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
        throw new NotFoundException('Course not found: ' + courseUUID);
      }
    } else {
      throw new Error(ERROR_CODES.USER_UUID_NULL_OR_INVALID);
    }
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

  /**
   * @param elementId Element Id
   * @param typeId Type Id
   * Type 0: Headline
   * Type 1: Text
   * @returns Options of the given element
   */
  async getElementOptions(elementId: number, typeId): Promise<any> {
    try {
      // if (typeId || elementId
      //     && validator.isNumeric(elementId)
      // ) throw new Error(ERROR_CODES.ELEMENT_ID_OR_TYPE_ID_NULL_OR_INVALID);

      let options = {};

      switch (typeId) {
        //HEADLINE
        case 1:
          let headlineOptions = await prisma.courseElementHeadlineSettings.findFirst({
            where: {
              courseElementHeadlineElementId: Number(elementId),
            },
          });
          options = {
            label: headlineOptions.courseElementHeadlineLabel,
          };
          break;
        //TEXT
        case 2:
          let textOptions = await prisma.courseElementTextSettings.findFirst({
            where: {
              courseElementId: Number(elementId),
            },
          });
          options = {
            text: textOptions.courseElementTextText,
          };
          break;
        //FILE SUBMISSION
        case 3:
          let fileOptions = await prisma.courseFileSubmissionSettings.findFirst({
            where: {
              courseFileSubmissionElementId: Number(elementId),
            },
          });
          options = {
            name: fileOptions.courseFileSubmissionName,
            description: fileOptions.courseFileSubmissionDescription,
            dueDate: fileOptions.courseFileSubmissionDueTimestamp,
            submitLater: fileOptions.courseFileSubmissionSubmitLater,
            submitLaterDate: fileOptions.courseFileSubmissionSubmitLaterTimestamp,
            maxFileSize: fileOptions.courseFileSubmissionMaxFileSize,
            allowedFileTypes: fileOptions.courseFileSubmissionAllowedFileTypes,
          };
      }
      return options;
    } catch (err) {
      console.log(err);

      throw new Error(ERROR_CODES.DATABASE_ERROR);
    }
  }

  async getElementIdByUUID(elementUUID: string): Promise<number> {
    if (elementUUID) {
      try {
        const element = await prisma.courseElements.findFirst({
          where: {
            courseElementUUID: elementUUID,
          },
        });
        return element.courseElementId;
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.ELEMENT_UUID_NULL_OR_INVALID);
    }
  }

  async getCourseIdByElementId(elementId: number): Promise<any> {
    if (elementId) {
      try {
        const element = await prisma.courseElements.findFirst({
          where: {
            courseElementId: elementId,
          },
        });
        return element.courseElementCourseId;
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.ELEMENT_ID_NULL_OR_INVALID);
    }
  }

  async getElementUUIDById(elementId: number): Promise<string> {
    if (elementId) {
      try {
        const element = await prisma.courseElements.findFirst({
          where: {
            courseElementId: elementId,
          },
        });
        return element.courseElementUUID;
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
            courseElementUUID: elementUUID,
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
            courseElementUUID: `${ID_STARTERS.COURSE_ELEMENT}${uuidv4()}`,
            courseElementTypeId: element.typeId,
            courseElementParentId: element.parentId,
            courseElementIsVisible: element.visible,
            courseElementWeight: 0,
            courseElementOrder: element.elementOrder,
            users: {
              connect: {
                userId: element.personCreationId,
              },
            },
            courses: {
              connect: {
                courseId: element.courseId,
              },
            },
          },
        });

        this.createElementOptions(
          element.options,
          elementId.courseElementCourseId,
          element.typeId,
        );
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.ELEMENT_NULL);
    }
  }

  async updateElementOptions(
    options,
    elementId: number,
    typeId: number,
  ): Promise<any> {
    if (options) {
      try {
        switch (typeId) {
          //HEADLINE
          case 1:
            await prisma.courseElementHeadlineSettings.update({
              where: {
                courseElementHeadlineId: elementId,
              },
              data: {
                courseElementHeadlineLabel: options.label,
              },
            });
            break;
          //TEXT
          case 2:
            await prisma.courseElementTextSettings.update({
              where: {
                courseElementTextSettingId: elementId,
              },
              data: {
                courseElementTextText: options.text,
              },
            });
            break;
          // FILE SUBMISSION
          case 3:
            await prisma.courseFileSubmissionSettings.update({
              where: {
                courseFileSubmissionSettingId: elementId,
              },
              data: {
                courseFileSubmissionName: options.name,
                courseFileSubmissionDescription: options.description,
                courseFileSubmissionDueTimestamp: options.dueTime,
                courseFileSubmissionSubmitLater: options.submitLater,
                courseFileSubmissionSubmitLaterTimestamp: options.submitLaterTime,
                courseFileSubmissionMaxFileSize: options.maxFileSize,
              },
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
    if (options) {
      try {
        switch (typeId) {
          //HEADLINE
          case 1:
            await prisma.courseElementHeadlineSettings.create({
              data: {
                courseElementHeadlineLabel: options.label,
                courseElementHeadlineElementId: elementId,
              },
            });
            break;
          //TEXT
          case 2:
            await prisma.courseElementTextSettings.create({
              data: {
                courseElementTextText: options.text,
                courseElementId: elementId,
              },
            });
            break;
          // FILE SUBMISSION
          case 3:
            await prisma.courseFileSubmissionSettings.create({
              data: {
                courseFileSubmissionElementId: elementId,
                courseFileSubmissionName: options.name,
                courseFileSubmissionDescription: options.description,
                courseFileSubmissionDueTimestamp: options.dueTime,
                courseFileSubmissionSubmitLater: options.submitLater,
                courseFileSubmissionSubmitLaterTimestamp: options.submitLaterTime,
                courseFileSubmissionMaxFileSize: options.maxFileSize,
                courseFileSubmissionAllowedFileTypes: options.allowedFileTypes,
              },
            });
        }
      } catch (err) {
        console.log(err);

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
            courseElementId: elementId,
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
            await prisma.courseElementHeadlineSettings.delete({
              where: {
                courseElementHeadlineId: elementId,
              },
            });
            break;
          //TEXT
          case 2:
            await prisma.courseElementTextSettings.delete({
              where: {
                courseElementTextSettingId: elementId,
              },
            });
            break;
          // FILE SUBMISSION
          case 3:
            await prisma.courseFileSubmissionSettings.delete({
              where: {
                courseFileSubmissionSettingId: elementId,
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

  async getClassIdByUUID(classUUID: string): Promise<any> {
    if (classUUID) {
      try {
        const classId = await prisma.schoolClasses.findFirst({
          where: {
            schoolClassUUID: classUUID,
          },
        });
        return classId.schoolClassId;
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
        const userInCourse = await prisma.courseUsers.findFirst({
          where: {
            userId,
            courseId,
          },
        });
        return userInCourse !== null;
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.ARTICLE_UUID_NULL_OR_INVALID);
    }
  }

  /**
   *
   * @param type Type of the element
   * @returns Type Id
   */
  async translateArticleType(type: number): Promise<any> {
    switch (type) {
      case 1:
        return 'Change Log';
    }
  }

  /**
   * @brief Returns 1 if reading time is less than 1 minute
   * @param content Content of the article
   * @returns Reading time in minutes
   */
  async computeReadingTime(content: string): Promise<any> {
    const words = content.split(' ').length;
    const minutes = Math.round(words / 200);
    return minutes == 0 ? 1 : minutes;
  }

  /**
   * Creates or resets all user settings
   * @param personId Id of a user
   */
  async createOrResetDefaultSettings(personId: number): Promise<any> {
    if (personId) {
      const defaultSettings = {
        language: 'en',
        timeZone: 'Europe/London',
        dateTimeFormat: 'en-US',
        receiveUpdateEmails: false,
        avatarUUID: '',
        phoneNumber: '',
        themeMode: 0,
        theme: -1,
      };

      try {
        const personSettings = await prisma.userSettings.findFirst({
          where: {
            userId: personId,
          },
        });

        if (personSettings) {
          await prisma.userSettings.update({
            where: {
              userId: personId,
            },
            data: defaultSettings,
          });
        } else {
          await prisma.userSettings.create({
            data: {
              userId: personId,
              ...defaultSettings,
            },
          });
        }
      } catch {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.USER_ID_NULL_OR_INVALID);
    }
  }

  async addUserToUpdateEmailList(personId: number): Promise<any> {
    if (personId) {
      try {
        const user = await this.getUserById(personId);
        await prisma.updateEmailReceivers.create({
          data: {
            personId,
            email: user.email,
          },
        });
      } catch {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.USER_ID_NULL_OR_INVALID);
    }
  }

  async getMaxFileSize() { }
  async removeUserFromUpdateEmailList(personId: number): Promise<any> {
    if (personId) {
      try {
        await prisma.updateEmailReceivers.delete({
          where: {
            personId,
          },
        });
      } catch {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.USER_ID_NULL_OR_INVALID);
    }
  }
  /**
   *
   * @param timeZone timezone string e.g. "europe/Vienna"
   * @returns true or false
   */
  isValidTimeZoneString(timeZone: string) {
    return moment.tz.zone(timeZone) != null;
  }

  /**
   *
   * @param language language string e.g. "en-US"
   * @returns true of false
   */
  isValidLanguageString(language: string) {
    return Object.keys(RFC5646_LANGUAGE_TAGS).includes(language);
  }

  /**
   *
   * @param language language string e.g. "German"
   * @returns true or false
   */
  isValidLongLanguageString(language: string) {
    return Object.values(RFC5646_LANGUAGE_TAGS).includes(language);
  }

  /**
   *
   * @param dateTimeFormat dateTimeFormat string 'en-US', 'en-GB" or 'de-DE'
   * @returns true or false
   */
  isValidDateTimeFormatString(dateTimeFormat: string) {
    const dateTimeFormats = {
      'en-US': 'MM/DD/YYYY hh:mm A',
      'en-GB': 'DD/MM/YYYY hh:mm A',
      'de-DE': 'DD.MM.YYYY hh:mm A',
    };

    return Object.keys(dateTimeFormats).includes(dateTimeFormat);
  }

  async createDefaultPublicProfileSettings(userId: number): Promise<any> {
    if (userId) {
      try {
        await prisma.publicProfileSettings.create({
          data: {
            personId: userId,
            displayName: await this.getUserUUIDById(userId),
            publicEmail: '',
            biography: '',
            location: '',
            preferredLanguage: '',
            showAge: false,
            showJoinDate: true,
            showBadges: true,
          },
        });
      } catch {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.USER_ID_NULL_OR_INVALID);
    }
  }

  calculateAge(birthday: Date): number {
    if (birthday) {
      const ageDifMs = Date.now() - new Date(birthday).getTime();
      const ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    } else {
      return 0;
    }
  }

  async emailIsRegisteredAndVerified(email: string): Promise<any> {
    if (email) {
      try {
        const user = await prisma.persons.findUnique({
          where: {
            email,
          },
        });
        if (user && Boolean(user.emailVerified)) {
          return user;
        } else {
          return false;
        }
      } catch {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.EMAIL_NULL_OR_INVALID);
    }
  }

  async getUserIdByPasswordResetToken(token: string): Promise<any> {
    if (token) {
      try {
        const user = await prisma.passwordResetTokens.findFirst({
          where: {
            token,
          },
        });
        if (user) {
          return user.personId;
        } else {
          return false;
        }
      } catch {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.TOKEN_NULL_OR_INVALID);
    }
  }

  async passwordResetTokenIsValidAndNotExpired(token: string): Promise<any> {
    if (token) {
      try {
        const user = await prisma.passwordResetTokens.findFirst({
          where: {
            token,
          },
        });
        if (user) {
          const now = new Date();
          const tokenExpireDate = new Date(user.expireDate);
          if (now < tokenExpireDate) {
            return true;
          } else {
            return {
              reason: 'expired',
            };
          }
        } else {
          return {
            reason: 'invalid',
          };
        }
      } catch {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.TOKEN_NULL_OR_INVALID);
    }
  }

  async deletePasswordResetToken(token: string): Promise<any> {
    if (token) {
      try {
        await prisma.passwordResetTokens.delete({
          where: {
            token,
          },
        });
      } catch {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.TOKEN_NULL_OR_INVALID);
    }
  }

  async emailChangeTokenIsValidAndNotExpired(token: string): Promise<any> {
    if (token) {
      try {
        const user = await prisma.emailChangeTokens.findFirst({
          where: {
            token,
          },
        });
        if (user) {
          const now = new Date();
          const tokenExpireDate = new Date(user.expireDate);
          if (now < tokenExpireDate) {
            return true;
          } else {
            return {
              reason: 'expired',
            };
          }
        } else {
          return {
            reason: 'invalid',
          };
        }
      } catch {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.TOKEN_NULL_OR_INVALID);
    }
  }

  async getUserIdByEmailChangeToken(token: string): Promise<any> {
    if (token) {
      try {
        const user = await prisma.emailChangeTokens.findFirst({
          where: {
            token,
          },
        });
        if (user) {
          return user.personId;
        } else {
          return false;
        }
      } catch {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.TOKEN_NULL_OR_INVALID);
    }
  }

  async getEmailByChangeToken(token: string): Promise<any> {
    if (token) {
      try {
        const user = await prisma.emailChangeTokens.findFirst({
          where: {
            token,
          },
        });
        if (user) {
          return user.email;
        } else {
          return false;
        }
      } catch {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.TOKEN_NULL_OR_INVALID);
    }
  }

  async deleteEmailChangeToken(token: string): Promise<any> {
    if (token) {
      try {
        await prisma.emailChangeTokens.delete({
          where: {
            token,
          },
        });
      } catch {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.TOKEN_NULL_OR_INVALID);
    }
  }

  generatePasswordResetToken() {
    return uuidv4();
  }

  /**
   * See [this](https://www.npmjs.com/package/uuid) for more information.
   * ```js
   * const emailChangeToken = generateEmailChangeToken();
   * ```
   * @returns A UUID v4 string (e.g. 'f0a0a0a0-0a0a-0a0a-0a0a-0a0a0a0a0a0a')
   */
  generateEmailChangeToken() {
    return uuidv4();
  }
  async getUserRoleBySchool(userId: number, schoolId: number): Promise<any> {
    if (userId && schoolId) {
      try {
        const userRole = await prisma.personRoles.findFirst({
          where: {
            personId: userId,
            schoolId: schoolId,
          },
        });
        return userRole.roleId;
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.USER_ID_NULL_OR_INVALID);
    }
  }

  async isTeacher(userId: number, schoolId: number): Promise<any> {
    if (userId && schoolId) {
      try {
        const userRole = await prisma.personRoles.findUnique({
          where: {
            schoolPersonId: {
              personId: userId,
              schoolId: schoolId,
            },
          },
        });
        if (Object.keys(Role)[userRole.roleId] === 'Teacher') {
          return true;
        } else {
          return false;
        }
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.USER_ID_NULL_OR_INVALID);
    }
  }

  async isAdmin(userId: number, schoolId: number): Promise<any> {
    if (userId && schoolId) {
      try {
        const userRole = await prisma.personRoles.findUnique({
          where: {
            schoolPersonId: {
              personId: userId,
              schoolId: schoolId,
            },
          },
        });

        if (Object.keys(Role)[userRole.roleId] === 'Admin') {
          return true;
        } else {
          return false;
        }
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.USER_ID_NULL_OR_INVALID);
    }
  }

  async isTeacherOrHigher(userId: number, schoolId: number): Promise<any> {
    if (userId && schoolId) {
      try {
        const userRole = await prisma.personRoles.findUnique({
          where: {
            schoolPersonId: {
              personId: userId,
              schoolId: schoolId,
            },
          },
        });

        if (
          Object.keys(Role)[userRole.roleId] === 'Teacher' ||
          Object.keys(Role)[userRole.roleId] === 'Admin'
        ) {
          return true;
        } else {
          return false;
        }
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.USER_ID_NULL_OR_INVALID);
    }
  }

  async userIdInSchool(userId: number, schoolId: number): Promise<any> {
    if (userId && schoolId) {
      try {
        const user = await prisma.schoolPersons.findUnique({
          where: {
            schoolPersonId: {
              personId: userId,
              schoolId: schoolId,
            },
          },
        });
        if (user) {
          return true;
        } else {
          return false;
        }
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.USER_ID_NULL_OR_INVALID);
    }
  }

  async getSchoolIdByCourseId(courseId: number): Promise<any> {
    if (courseId) {
      try {
        const course = await prisma.courses.findUnique({
          where: {
            courseId,
          },
        });
        return course.schoolId;
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.COURSE_ID_NULL_OR_INVALID);
    }
  }
  async getCourseUsers(courseId: number): Promise<any> {
    if (courseId) {
      try {
        const courseUsers = await prisma.coursePersons.findMany({
          where: {
            courseId: courseId,
          },
        });

        const users = [];

        for (const user of courseUsers) {
          const userData = await prisma.persons.findUnique({
            where: {
              personId: user.personId,
            },
          });
          users.push(userData);
        }
        return users;
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.COURSE_ID_NULL_OR_INVALID);
    }
  }

  async getCourseClasses(courseId: number): Promise<any> {
    if (courseId) {
      try {
        const courseClasses = await prisma.courseClasses.findMany({
          where: {
            courseId: courseId,
          },
        });

        return courseClasses;
      } catch (err) {
        throw new Error(ERROR_CODES.DATABASE_ERROR);
      }
    } else {
      throw new Error(ERROR_CODES.COURSE_ID_NULL_OR_INVALID);
    }
  }
}
