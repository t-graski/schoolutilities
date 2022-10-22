import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { DatabaseService } from 'src/database/database.service';
import { RETURN_DATA, PASSWORD } from 'src/misc/parameterConstants';
import validator from 'validator';
import { MailService } from 'src/mail/mail.service';
import { ReturnMessage } from 'src/types/Database';
import { HelperService } from 'src/helper/helper.service';
import { Cron } from '@nestjs/schedule';
import { ConnectDiscordDTO, DisconnectDiscordDTO, DiscordUser } from 'src/entity/discord-user/discordUser';
import { Request } from 'express';

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

  async connectDiscord(payload: ConnectDiscordDTO, request: Request): Promise<DiscordUser> {
    const { discordGuildChannelId, discordGuildId, discordUserChannelId, discordUserId } = payload;

    try {
      const token = await this.helper.extractJWTToken(request);
      const userUUID = await this.helper.getUserUUIDfromJWT(token);
      const discordUser = await prisma.userDiscordConnections.create({
        data: {
          discordGuildChannelId,
          discordGuildId,
          discordUserChannelId,
          discordUserId,
          users: {
            connect: {
              userUUID,
            }
          }
        },
      });
      return new DiscordUser(discordUser);
    } catch {
      throw new InternalServerErrorException('Database error');
    }
  }

  async disconnectDiscord(payload: DisconnectDiscordDTO, request: Request): Promise<number> {
    const { userUUID } = payload;
    try {
      await prisma.userDiscordConnections.deleteMany({
        where: {
          users: {
            userUUID,
          }
        }
      });
      return 200;
    } catch {
      throw new InternalServerErrorException('Database error');
    }
  }


  async getSchools(token: string): Promise<ReturnMessage> {
    const jwt = await this.authService.decodeJWT(token);
    const personUUID = jwt.personUUID;
    const userId = await this.databaseService.getPersonIdByUUID(personUUID);

    try {
      const userSchools = await prisma.schoolUsers.findMany({
        where: {
          schoolUserId: userId,
        },
        select: {
          schoolId: true,
        },
      });

      const schools = [];

      for (const school of userSchools) {
        const schoolData = await this.databaseService.getSchoolById(
          school.schoolId,
        );

        schools.push({
          schoolUUID: schoolData.schoolUUID,
          schoolName: schoolData.schoolName,
          schoolLanguage: this.parseLanguage(schoolData.schoolLanguageId),
          schoolTimezone: schoolData.schoolTimezone,
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
      const user = await prisma.users.findFirst({
        where: {
          userUUID: personUUID,
        },
      });

      const userSettings = await prisma.userSettings.findFirst({
        where: {
          userId: user.userId,
        },
      });

      if (!userSettings) {
        await this.helper.createOrResetDefaultSettings(user.userId);
      }

      const userItem = {
        userUUID: user.userUUID,
        userFirstname: user.userFirstname,
        userLastname: user.userLastname,
        userFullname: user.userFirstname + ' ' + user.userLastname,
        userBirthDate: new Date(user.userBirthDate).toISOString().split('T')[0],
        userEmail: user.userEmail,
        userEmailVerified: user.userEmailVerified,
        userCreationTimestamp: user.userCreationTimestamp,
        userSettings: {
          userSettingLanguage: userSettings.userSettingLanguageId,
          userSettingTimeZone: userSettings.userSettingTimeZone,
          userSettingDateTimeFormat: userSettings.userSettingDateTimeFormat,
          userSettingReceiveUpdateEmails: userSettings.userSettingReceiveUpdateEmails,
          userSettingAvatarUUID: userSettings.userSettingAvatarUUID,
          userSettingPhoneNumber: userSettings.userSettingPhoneNumber,
          userSettingThemeMode: userSettings.userSettingThemeMode,
          userSettingTheme: userSettings.userSettingTheme,
        },
      };

      return {
        status: RETURN_DATA.SUCCESS.status,
        data: userItem,
      };
    } catch (err) {
      console.log(err);
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

    let userSettings = await prisma.userSettings.findFirst({
      where: {
        userId,
      },
    });

    if (!userSettings) {
      await this.helper.createOrResetDefaultSettings(userId);
    }

    if (!userSettings.userSettingReceiveUpdateEmails && receiveUpdateEmails) {
      await this.helper.addUserToUpdateEmailList(userId);
    }

    if (userSettings.userSettingReceiveUpdateEmails && !receiveUpdateEmails) {
      await this.helper.removeUserFromUpdateEmailList(userId);
    }

    if (themeMode == 0) theme = -1;
    if (theme != -1) themeMode = 0;

    await prisma.userSettings.update({
      where: {
        userId,
      },
      data: {
        userSettingLanguageId: language,
        userSettingTimeZone: timeZone,
        userSettingDateTimeFormat: dateTimeFormat,
        userSettingReceiveUpdateEmails: receiveUpdateEmails,
        userSettingAvatarUUID: avatarUUID,
        userSettingPhoneNumber: phoneNumber,
        userSettingThemeMode: themeMode,
        userSettingTheme: theme,
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

    const userSettings = await prisma.userPublicProfileSettings.findFirst({
      where: {
        userId,
      },
    });

    if (!userSettings) {
      await this.helper.createDefaultPublicProfileSettings(userId);
    }

    await prisma.userPublicProfileSettings.update({
      where: {
        userId,
      },
      data: {
        userPublicProfileDisplayName: displayName,
        userPublicProfileSettingPublicEmail: publicEmail,
        userPublicProfileSettingBiography: biography,
        userPublicProfileSettingLocation: location,
        userPublicProfileSettingPreferredLanguageId: preferredLanguage,
        userPublicProfileSettingShowAge: showAge,
        userPublicProfileSettingShowJoinDate: showJoinDate,
        userPublicProfileSettingShowBadges: showBadges,
      },
    });

    return RETURN_DATA.SUCCESS;
  }

  async getPublicProfile(request): Promise<ReturnMessage> {
    const jwt = await this.helper.extractJWTToken(request);
    const userId = await this.helper.getUserIdfromJWT(jwt);

    try {
      let user = await prisma.users.findFirst({
        where: {
          userId,
        },
      });

      let userSettings = await prisma.userPublicProfileSettings.findFirst({
        where: {
          userId,
        },
      });

      let userBadges = await prisma.userBadges.findMany({
        where: {
          userId,
        },
      });

      // let badges = userBadges.map((badge) => {
      //   return BADGES[badge.badgeId]
      // })

      let badges;

      let userItem = {
        userUUID: user.userUUID,
        userPublicProfileDisplayName: userSettings.userPublicProfileDisplayName,
        userBirthDate: userSettings.userPublicProfileSettingShowAge
          ? new Date(user.userBirthDate).toISOString().split('T')[0]
          : '',
        userPublicProfileSettingPublicEmail: userSettings.userPublicProfileSettingPublicEmail,
        userPublicProfileSettingBiography: userSettings.userPublicProfileSettingBiography,
        userPublicProfileSettingLocation: userSettings.userPublicProfileSettingLocation,
        userPublicProfileSettingPreferredLanguage: userSettings.userPublicProfileSettingPreferredLanguageId,
        userPublicProfileAge: userSettings.userPublicProfileSettingShowAge
          ? this.helper.calculateAge(user.userBirthDate)
          : '',
        userPublicProfileJoinDate: userSettings.userPublicProfileSettingShowJoinDate ? user.userCreationTimestamp : 0,
        userPublicProfileBadges: userSettings.userPublicProfileSettingShowBadges ? badges : [],
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

    await prisma.userPasswordResetTokens.create({
      data: {
        userId,
        userPasswordResetToken: token,
        userPasswordResetTokenExpireTimestamp: new Date(Date.now() + 24 * 60 * 60 * 1000),
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
      await prisma.users.update({
        where: {
          userId: userId,
        },
        data: {
          userPassword: encryptedPassword,
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
    await prisma.userPasswordResetTokens.deleteMany({
      where: {
        userPasswordResetTokenExpireTimestamp: {
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
      await prisma.userEmailChangeTokens.create({
        data: {
          users: {
            connect: {
              userId,
            },
          },
          emailChangeTokenNewEmail: email,
          emailChangeTokenVerified: false,
          emailChangeToken: token,
          emailChangeTokenExpireTimestamp: new Date(Date.now() + 24 * 60 * 60 * 1000),
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
      await prisma.users.update({
        where: {
          userId,
        },
        data: {
          userEmail: email,
        },
      });
      return RETURN_DATA.SUCCESS;
    } catch {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  @Cron('0 1 * * *')
  async deleteExpiredEmailChangeTokens() {
    await prisma.userEmailChangeTokens.deleteMany({
      where: {
        emailChangeTokenExpireTimestamp: {
          lt: new Date(),
        },
      },
    });
  }

  // @Cron('40 * * * * *')
  // ! TODO
  async checkAndUpdateBadges() {
    let allUsers = await prisma.users.findMany({
      select: {
        userId: true,
        userUUID: true,
        userCreationTimestamp: true,
      },
    });
    for (let user of allUsers) {
    }
  }

  parseLanguage(id: number) {
    return id === 1 ? 'de' : 'en';
  }
}

export async function findOneByUUID(userUUID: string): Promise<any> { //!TODO change to person
  try {
    const user = await prisma.users.findFirst({
      where: {
        userUUID,
      },
    });
    return user ? user : null;
  } catch {
    return null;
  }
}
