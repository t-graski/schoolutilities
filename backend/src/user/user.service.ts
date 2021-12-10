import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { DatabaseService } from 'src/database/database.service';
import { RETURN_DATA, PASSWORD } from 'src/misc/parameterConstants';
import validator from 'validator';
import { nanoid } from 'nanoid';
import { MailService } from 'src/mail/mail.service';
import { ReturnMessage } from 'src/types/Database';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}

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
        to: oldEmail,
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

  parseLanguage(id: number) {
    return id === 1 ? 'de' : 'en';
  }
}

// async function generateEmailChangeToken(
//   email: string,
//   databaseService: DatabaseService,
//   mailService: MailService,
// ): Promise<string> {
//   const generatedToken = nanoid();

//   try {
//     await prisma.registerTokens.create({
//       data: {
//         persons: {
//           connect: {
//             personId: Number(userId['personId']),
//           },
//         },
//         token: generatedToken,
//       },
//     });
//   } catch (error) {
//     throw new Error('Error while generating token: ' + error);
//   }

//   const text = `Please confirm your registration by clicking at this link: http://localhost:3000/auth/register?token=${generatedToken}`;
//   const html = `
//     <iframe title="Email" src="localhost:3000/school/admin/settings"></iframe>
//     `;
//   const message = {
//     from: 'noreply@schoolutilities.net',
//     to: email,
//     subject: 'Registrierungsbestätigung - Schoolutilities',
//     text,
//     html,
//   };
//   mailService.sendMail(message);
//   return generatedToken;
// }
