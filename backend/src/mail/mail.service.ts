import { Injectable } from '@nestjs/common';
import { logMailSend } from '../misc/logger';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');

@Injectable()
export class MailService {
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

    const mail = await transporter.sendMail(message);
    logMailSend(Date.now(), message.to);
  }
}
