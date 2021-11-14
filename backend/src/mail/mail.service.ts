import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');

@Injectable()
export class MailService {
  async initMail(message) {
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

    console.log('Email sent: %s', mail.messageId);
  }
}
