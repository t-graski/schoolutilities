import { HttpStatus, Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { DatabaseService } from 'src/database/database.service';
import { RegisterUserData } from 'src/types/User';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CryptoJS = require('crypto-js');

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}
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
  async activateAccount(token: string) {
    const unverifiedUsersOfToken =
      await this.databaseService.getUnverifiedUserByRegisterToken(token);
    if (unverifiedUsersOfToken.length == 0) return HttpStatus.NOT_FOUND;
    return await verifyAccount(token, this.databaseService);
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
  if (!insertTokenStatus || (insertTokenStatus && !insertTokenStatus.insertId))
    throw new Error('Error while generating token');
  const text = `Please confirm your registration by clicking at this link: http://localhost:3000/auth/register-approved?token=${generatedToken}`;
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

async function verifyAccount(token: string, databaseService: DatabaseService) {
  const activateAccountStatus = await databaseService.activateAccount(token);

  if (activateAccountStatus && activateAccountStatus.affectedRows > 0) {
    const deleteTokenStatus = await databaseService.deleteRegisterToken(token);
    if (deleteTokenStatus && deleteTokenStatus.affectedRows > 0) {
      return HttpStatus.OK;
    } else {
      return HttpStatus.BAD_REQUEST;
    }
  } else {
    return HttpStatus.NOT_FOUND;
  }
}
