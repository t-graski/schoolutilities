import { HttpStatus, Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { DatabaseService } from 'src/database/database.service';
import { LoginUserData, RegisterUserData } from 'src/types/User';
import { UsersService } from '../users/users.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CryptoJS = require('crypto-js');

@Injectable()
export class AuthService {
  constructor(
    private authService: AuthService,
    private readonly databaseService: DatabaseService,
  ) {}

  async loginUser(userData: LoginUserData) {
    const userDbData = await this.databaseService.getUserData(userData);
    if (userDbData.length == 0)
      return { statusCode: HttpStatus.NOT_FOUND, token: null };
    if (userDbData[0] && userDbData[0].email_verified == 0)
      return { statusCode: HttpStatus.FORBIDDEN, token: null };
    const passwordBytes = CryptoJS.DES.decrypt(
      userDbData[0].password,
      process.env.PASSWORD_ENCRYPTION_KEY,
    );
    const password = passwordBytes.toString(CryptoJS.enc.Utf8);
    if (userData.password !== password)
      return { statusCode: HttpStatus.NOT_FOUND, token: null };
    const token = nanoid();
    const insertTokenStatus = await this.databaseService.insertToken(
      userDbData[0].person_id,
      token,
    );
    if (
      !insertTokenStatus ||
      (insertTokenStatus && !insertTokenStatus.insertId)
    )
      return { statusCode: HttpStatus.BAD_REQUEST, token: null };
    return { statusCode: HttpStatus.OK, token: token };
  }

  async registerUser(userData: RegisterUserData) {
    const userOfEmail = await this.databaseService.getUserData(userData);
    // if (userOfEmail && userOfEmail.length > 0) {
    //   return 'exists';
    // }
    userData.password = CryptoJS.DES.encrypt(
      userData.password,
      process.env.PASSWORD_ENCRYPTION_KEY,
    ).toString();
    const registerUserData = await this.databaseService.registerUser(userData);
    if (registerUserData) {
      generateRegisterToken(registerUserData.insertId, userData.email);
      return 'successfull';
    }
  }

  async verifyAccount(token: string) {
    const activateAccountStatus = await this.databaseService.activateAccount(
      token,
    );

    if (activateAccountStatus && activateAccountStatus.affectedRows > 0) {
      const deleteTokenStatus = await this.databaseService.deleteRegisterToken(
        token,
      );
      if (deleteTokenStatus && deleteTokenStatus.affectedRows > 0) {
        return HttpStatus.OK;
      } else {
        return HttpStatus.BAD_REQUEST;
      }
    } else {
      return HttpStatus.NOT_FOUND;
    }
  }
}

async function generateRegisterToken(
  personId: number,
  email: string,
): Promise<string> {
  const generatedToken = nanoid();
  const insertTokenStatus = await this.databaseService.insertRegisterToken(
    personId,
    generatedToken,
  );
  console.log(insertTokenStatus);
  if (!insertTokenStatus || (insertTokenStatus && !insertTokenStatus.insertId))
    throw new Error('Error while generating token');
  const text = `Please confirm your registration by clicking at this link: http://localhost:3000/auth/register?token=${generatedToken}`;
  console.log(email);
  const message = {
    from: 'noreply@schoolutilities.net',
    to: email,
    subject: 'Registrierungsbestätigung - Schoolutilities',
    text,
    html: text,
  };
  this.mailService.initMail(message);
  return generatedToken;
}
