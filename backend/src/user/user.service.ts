import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { DatabaseService } from 'src/database/database.service';
import { RETURN_DATA, PASSWORD, LENGTHS } from 'src/misc/parameterConstants';
import validator from 'validator';
import { nanoid } from 'nanoid';
import { MailService } from 'src/mail/mail.service';
import { ReturnMessage } from 'src/types/Database';
import { HelperService } from 'src/helper/helper.service';
import { BADGES } from 'src/misc/badges';
import { Cron } from '@nestjs/schedule';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly authService: AuthService,
    private readonly mailService: MailService,
    private readonly helper: HelperService,
  ) { }

  async changePassword(body, token: string) {
    const { oldPassword, newPassword } = body;

    if (
      !validator.isStrongPassword(newPassword, PASSWORD) ||
      !validator.isStrongPassword(oldPassword, PASSWORD) ||
      oldPassword === newPassword
    ) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const jwt = await this.authService.decodeJWT(token);
    const personUUID = jwt.personUUID;

    const currentPassword = await prisma.persons.findFirst({
      where: {
        personUUID,
      },
      select: {
        password: true,
      },
    });

    try {
      if (bcrypt.compareSync(oldPassword, currentPassword.password)) {
        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        await prisma.persons.update({
          where: {
            personUUID,
          },
          data: {
            password: hashedPassword,
          },
        });
      }
      return RETURN_DATA.SUCCESS;
    } catch (error) {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  async changeEmail(body, token: string) {
    const { newEmail } = body;
    const jwt = await this.authService.decodeJWT(token);
    const personUUID = jwt.personUUID;
    const oldEmail = await this.databaseService.getPersonEmailByUUID(
      personUUID,
    );

    if (!validator.isEmail(newEmail) || oldEmail === newEmail) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const newEmailExists = await this.databaseService.getPersonByEmail(
      newEmail,
    );

    if (newEmailExists) {
      return RETURN_DATA.ALREADY_EXISTS;
    }

    try {
      const personId = await this.databaseService.getPersonIdByUUID(personUUID);
      const token = nanoid();
      await prisma.emailChangeToken.create({
        data: {
          token,
          persons: {
            connect: {
              personId: personId,
            },
          },
          newEmail,
        },
      });

      const text = `Please confirm your email change by clicking on the following link: http://localhost:3000/auth/email-change?token=${token}`;
      const html = `Please confirm your email change by clicking on the following link: http://localhost:3000/auth/email-change?token=${token}`;

      const message = {
        from: 'noreply@schoolutilities.net',
        to: newEmail,
        subject: 'Email Change - SchoolUtilities',
        text,
        html,
      };
      this.mailService.sendMail(message);
      return RETURN_DATA.SUCCESS;
    } catch (error) {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  async getSchools(token: string): Promise<ReturnMessage> {
    const jwt = await this.authService.decodeJWT(token);
    const personUUID = jwt.personUUID;
    const personId = await this.databaseService.getPersonIdByUUID(personUUID);

    try {
      const userSchools = await prisma.schoolPersons.findMany({
        where: {
          personId: Number(personId),
        },
        select: {
          schoolId: true,
        },
      });

      const schools = [];

      for (let school of userSchools) {
        const schoolData = await this.databaseService.getSchoolById(
          school.schoolId,
        );

        schools.push({
          schoolUUID: schoolData.schoolUUID,
          schoolName: schoolData.name,
          language: this.parseLanguage(schoolData.languageId),
          timezone: schoolData.timezone,
        });
      }
      return {
        status: RETURN_DATA.SUCCESS.status,
        data: schools,
      };
    } catch (error) {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  async getProfile(token: string): Promise<ReturnMessage> {
    const jwt = await this.authService.decodeJWT(token);
    const personUUID = jwt.personUUID;

    if (!validator.isUUID(personUUID.slice(1), 4)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    try {
      const user = await prisma.persons.findFirst({
        where: {
          personUUID,
        },
      });

      const userSettings = await prisma.personSettings.findFirst({
        where: {
          personId: user.personId,
        },
      });

      let userItem = {
        userUUID: user.personUUID,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.firstName + ' ' + user.lastName,
        birthday: new Date(user.birthDate).toISOString().split('T')[0],
        email: user.email,
        emailVerified: user.emailVerified,
        creationDate: user.creationDate,
        userSettings: {
          language: userSettings.language,
          timeZone: userSettings.timeZone,
          dateTimeFormat: userSettings.dateTimeFormat,
          receiveUpdateEmails: userSettings.receiveUpdateEmails,
          avatarUUID: userSettings.avatarUUID,
          phoneNumber: userSettings.phoneNumber,
          themeMode: userSettings.themeMode,
          theme: userSettings.theme,
        },
      }

      return {
        status: RETURN_DATA.SUCCESS.status,
        data: userItem,
      };
    } catch (err) {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  async activateNewEmail(token: string): Promise<ReturnMessage> {
    const person = await prisma.emailChangeToken.findFirst({
      where: {
        token,
      },
      select: {
        personId: true,
        newEmail: true,
      },
    });

    if (!person) {
      return RETURN_DATA.NOT_FOUND;
    }
    try {
      await prisma.persons.update({
        where: {
          personId: Number(person.personId),
        },
        data: {
          email: person.newEmail,
        },
      });
      return RETURN_DATA.SUCCESS;
    } catch (error) {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  async updateUserSettings(request): Promise<ReturnMessage> {
    let { language, timeZone, dateTimeFormat, receiveUpdateEmails,
      avatarUUID, phoneNumber, themeMode, theme } = request.body;

    const token = await this.helper.extractJWTToken(request);
    const userId = await this.helper.getUserIdfromJWT(token);

    if (phoneNumber) {
      if (!validator.isMobilePhone(phoneNumber, 'any')) {
        return RETURN_DATA.INVALID_INPUT;
      }
    }

    if (!this.helper.isValidTimeZoneString(timeZone)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    if (!this.helper.isValidLanguageString(language)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    if (!this.helper.isValidDateTimeFormatString(dateTimeFormat)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    let userSettings = await prisma.personSettings.findFirst({
      where: {
        personId: userId
      },
    });

    if (!userSettings) {
      await this.helper.createOrResestDefaultSettings(userId);
    }

    if (!userSettings.receiveUpdateEmails && receiveUpdateEmails) {
      await this.helper.addUserToUpdateEmailList(userId);
    }

    if (userSettings.receiveUpdateEmails && !receiveUpdateEmails) {
      await this.helper.removeUserFromUpdateEmailList(userId);
    }

    if (themeMode == 0) theme = -1;
    if (theme != -1) themeMode = 0;

    await prisma.personSettings.update({

      where: {
        personId: Number(userId),
      },
      data: {
        language: language,
        timeZone: timeZone,
        dateTimeFormat: dateTimeFormat,
        receiveUpdateEmails: receiveUpdateEmails,
        avatarUUID: avatarUUID,
        phoneNumber: phoneNumber,
        themeMode: themeMode,
        theme: theme,
      },
    });
    return RETURN_DATA.SUCCESS;
  }

  async updatePublicProfile(request): Promise<ReturnMessage> {
    let { displayName, publicEmail, biography, location, preferredLanguage, showAge, showJoinDate, showBadges } = request.body;
    const token = await this.helper.extractJWTToken(request);
    const userId = await this.helper.getUserIdfromJWT(token);

    const userSettings = await prisma.publicProfileSettings.findFirst({
      where: {
        personId: userId
      }
    });

    if (!userSettings) {
      await this.helper.createDefaultPublicProfileSettings(userId);
    }

    await prisma.publicProfileSettings.update({
      where: {
        personId: userId,
      },
      data: {
        displayName: displayName,
        publicEmail: publicEmail,
        biography: biography,
        location: location,
        preferredLanguage: preferredLanguage,
        showAge: showAge,
        showJoinDate: showJoinDate,
        showBadges: showBadges,
      },
    });


    return RETURN_DATA.SUCCESS;
  }

  async getPublicProfile(request): Promise<ReturnMessage> {
    const jwt = await this.helper.extractJWTToken(request);
    const userId = await this.helper.getUserIdfromJWT(jwt);

    try {
      let user = await prisma.persons.findFirst({
        where: {
          personId: userId,
        },
      });

      let userSettings = await prisma.publicProfileSettings.findFirst({
        where: {
          personId: userId,
        },
      });

      let userBadges = await prisma.personBadges.findMany({
        where: {
          personId: userId,
        },
      });

      let badges = userBadges.map((badge) => {
        return BADGES[badge.badgeId]
      })

      let userItem = {
        userUUID: user.personUUID,
        displayName: userSettings.displayName,
        birthday: userSettings.showAge ? new Date(user.birthDate).toISOString().split('T')[0] : "",
        email: userSettings.publicEmail,
        biography: userSettings.biography,
        location: userSettings.location,
        preferredLanguage: userSettings.preferredLanguage,
        age: userSettings.showAge ? this.helper.calculateAge(user.birthDate) : "",
        joinDate: userSettings.showJoinDate ? user.creationDate : 0,
        badges: userSettings.showBadges ? badges : [],
      }

      return {
        status: RETURN_DATA.SUCCESS.status,
        data: userItem,
      };

    } catch (error) {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }
  // @Cron('40 * * * * *')
  // ! TODO 
  async checkAndUpdateBadges() {
    let allUsers = await prisma.persons.findMany({
      select: {
        personId: true,
        personUUID: true,
        creationDate: true,
      },
    });

    for (let user of allUsers) {

    }
  }

  parseLanguage(id: number) {
    return id === 1 ? 'de' : 'en';
  }
}
