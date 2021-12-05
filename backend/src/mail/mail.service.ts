import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ID_STARTERS, RETURN_DATA } from '../misc/parameterConstants';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from 'src/database/database.service';
import { ReturnMessage } from 'src/types/Database';
const prisma = new PrismaClient();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');

@Injectable()
export class MailService {
  constructor(private readonly databaseService: DatabaseService) {}
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
    } catch (error) {}
  }

  async logMailSend(message) {
    const receiver = message.to;
    const subject = message.subject;
    const personId = await this.databaseService.getUserIdByEmail(receiver);

    try {
      await prisma.emailLog.create({
        data: {
          emailUUID: `${ID_STARTERS.EMAIL}${uuidv4()}`,
          personId: personId['personId'],
          emailSubject: subject,
          emailReceiver: receiver,
        },
      });
    } catch (error) {}
  }

  async getMailsSentToUser(userEmail: string): Promise<ReturnMessage> {
    const personId = await this.databaseService.getUserIdByEmail(userEmail);
    if (!personId) return RETURN_DATA.NOT_FOUND;
    try {
      const mails = await prisma.emailLog.findMany({
        where: {
          personId: personId['personId'],
        },
        select: {
          emailUUID: true,
          emailDate: true,
          emailSubject: true,
        },
      });
      return {
        status: HttpStatus.OK,
        data: mails,
      };
    } catch (error) {
      return RETURN_DATA.DATABASE_ERROR;
    }
  }
}
