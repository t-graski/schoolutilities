import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { DatabaseService } from 'src/database/database.service';
import { RETURN_DATA, PASSWORD } from 'src/misc/parameterConstants';
import validator from 'validator';
import { nanoid } from 'nanoid';
import { MailService } from 'src/mail/mail.service';
import { ReturnMessage } from 'src/types/Database';
import { HelperService } from 'src/helper/helper.service';
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
      };

      return {
        status: RETURN_DATA.SUCCESS.status,
        data: userItem,
      };
    } catch (err) {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  async updateUserSettings(request): Promise<ReturnMessage> {
    let {
      language,
      timeZone,
      dateTimeFormat,
      receiveUpdateEmails,
      avatarUUID,
      phoneNumber,
      themeMode,
      theme,
    } = request.body;

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
        personId: userId,
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
    let {
      displayName,
      publicEmail,
      biography,
      location,
      preferredLanguage,
      showAge,
      showJoinDate,
      showBadges,
    } = request.body;
    const token = await this.helper.extractJWTToken(request);
    const userId = await this.helper.getUserIdfromJWT(token);

    const userSettings = await prisma.publicProfileSettings.findFirst({
      where: {
        personId: userId,
      },
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

      // let badges = userBadges.map((badge) => {
      //   return BADGES[badge.badgeId]
      // })

      let badges;

      let userItem = {
        userUUID: user.personUUID,
        displayName: userSettings.displayName,
        birthday: userSettings.showAge
          ? new Date(user.birthDate).toISOString().split('T')[0]
          : '',
        email: userSettings.publicEmail,
        biography: userSettings.biography,
        location: userSettings.location,
        preferredLanguage: userSettings.preferredLanguage,
        age: userSettings.showAge
          ? this.helper.calculateAge(user.birthDate)
          : '',
        joinDate: userSettings.showJoinDate ? user.creationDate : 0,
        badges: userSettings.showBadges ? badges : [],
      };

      return {
        status: RETURN_DATA.SUCCESS.status,
        data: userItem,
      };
    } catch (error) {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  async requestPasswordReset(request): Promise<ReturnMessage> {
    const { email } = request.body;

    if (!validator.isEmail(email)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    if (!(await this.helper.emailIsRegisteredAndVerified(email))) {
      return RETURN_DATA.NOT_FOUND;
    }

    const token = this.helper.generatePasswordResetToken();
    const userId = await this.helper.getUserIdByEmail(email);

    await prisma.passwordResetTokens.create({
      data: {
        personId: userId,
        token,
        expireDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    const mail = {
      from: 'noreply@schoolutilities.net',
      to: email,
      subject: 'Password reset - Schoolutilities',
      text: `A request has been received to reset your password. If you did not request this, please ignore this email. Otherwise, please click the following link to reset your password: https://schoolutilities.net/auth/reset-password?token=${token}`,
    };

    await this.mailService.sendMail(mail);

    return RETURN_DATA.SUCCESS;
  }

  async passwordReset(request): Promise<ReturnMessage> {
    const { token, password } = request.body;
    const userId = await this.helper.getUserIdByPasswordResetToken(token);
    const encryptedPassword = await bcrypt.hash(password, 10);

    if (!validator.isStrongPassword(password, PASSWORD)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const tokenStatus =
      await this.helper.passwordResetTokenIsValidAndNotExpired(token);

    if (tokenStatus?.reason == 'expired') {
      await this.helper.deletePasswordResetToken(token);
      return RETURN_DATA.INVALID_INPUT;
    }

    if (tokenStatus?.reason == 'invalid') {
      return RETURN_DATA.INVALID_INPUT;
    }

    try {
      await prisma.persons.update({
        where: {
          personId: userId,
        },
        data: {
          password: encryptedPassword,
        },
      });

      await this.helper.deletePasswordResetToken(token);

      return RETURN_DATA.SUCCESS;
    } catch {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  @Cron('0 0 * * *')
  async deleteExpiredPasswordResetTokens() {
    await prisma.passwordResetTokens.deleteMany({
      where: {
        expireDate: {
          lt: new Date(),
        },
      },
    });
  }

  async requestEmailChange(request): Promise<ReturnMessage> {
    const { email } = request.body;
    const jwt = await this.helper.extractJWTToken(request);
    const userId = await this.helper.getUserIdfromJWT(jwt);
    const currentEmail = await this.helper.getUserById(userId);

    if (currentEmail.email.toLowerCase() === email.toLowerCase()) {
      return {
        message: 'Email must not be the same as the current one',
        status: RETURN_DATA.INVALID_INPUT.status,
      };
    }

    if (!validator.isEmail(email)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    try {
      const token = this.helper.generateEmailChangeToken();
      await prisma.emailChangeTokens.create({
        data: {
          persons: {
            connect: {
              personId: userId,
            },
          },
          email,
          verified: false,
          token,
          expireDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });

      const mail = {
        from: 'noreply@schoolutilities.net',
        to: email,
        subject: 'Email change - SchoolUtilities',
        text: `A request has been received to change your email address. If you did not request this, please ignore this email. Otherwise, please click the following link to change your email address: https://schoolutilities.net/auth/email-change?token=${token}`,
      };
      await this.mailService.sendMail(mail);
    } catch {
      return RETURN_DATA.DATABASE_ERROR;
    }

    return RETURN_DATA.SUCCESS;
  }

  async verifyEmailChange(request): Promise<ReturnMessage> {
    const { token } = request.body;

    const tokenStatus = await this.helper.emailChangeTokenIsValidAndNotExpired(
      token,
    );

    if (tokenStatus?.reason == 'expired') {
      await this.helper.deleteEmailChangeToken(token);
      return RETURN_DATA.INVALID_INPUT;
    }

    if (tokenStatus?.reason == 'invalid') {
      return RETURN_DATA.INVALID_INPUT;
    }

    const userId = await this.helper.getUserIdByEmailChangeToken(token);
    const email = await this.helper.getEmailByChangeToken(token);

    try {
      await prisma.persons.update({
        where: {
          personId: userId,
        },
        data: {
          email,
        },
      });
      return RETURN_DATA.SUCCESS;
    } catch {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  @Cron('0 1 * * *')
  async deleteExpiredEmailChangeTokens() {
    await prisma.emailChangeTokens.deleteMany({
      where: {
        expireDate: {
          lt: new Date(),
        },
      },
    });
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
