import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ID_STARTERS, RETURN_DATA } from '../misc/parameterConstants';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from 'src/database/database.service';
import { LogEmail } from 'src/entity/log/email';
const prisma = new PrismaClient();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');

@Injectable()
export class MailService {
  constructor(private readonly databaseService: DatabaseService) { }
  async sendMail(message) {
    const transporter = nodemailer.createTransport({
      name: 'Schoolutilities Noreply',
      host: 'mail.schoolutilities.net',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_NOREPLY_EMAIL,
        pass: process.env.MAIL_NOREPLY_PASSWORD,
      },
    });
    try {
      await transporter.sendMail(message);
      this.logMailSend(message);
    } catch { }
  }

  async logMailSend(message) {
    const receiver = message.to;
    const subject = message.subject;
    const user = await this.databaseService.getUserIdByEmail(receiver);

    try {
      await prisma.logEmails.create({
        data: {
          logEmailUUID: `${ID_STARTERS.EMAIL}${uuidv4()}`,
          users: {
            connect: {
              userUUID: user.userUUID,
            },
          },
          logEmailSubject: subject,
          logEmailReceiver: receiver,
        },
      });
    } catch { }
  }

  async getMailsSentToUser(userEmail: string): Promise<LogEmail[]> {
    try {
      const mails = await prisma.logEmails.findMany({
        where: {
          users: {
            userEmail,
          }
        },
      });
      return mails.map(mail => new LogEmail(mail));
    } catch {
      throw new InternalServerErrorException("Database error");
    }
  }
}
