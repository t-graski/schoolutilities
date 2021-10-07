import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { nanoid } from 'nanoid';
import { DatabaseService } from 'src/database/database.service';
import { MailService } from 'src/mail/mail.service';
import { LoginUserData, RegisterUserData } from 'src/types/User';
import { UsersService } from '../users/users.service';
import { jwtConstants } from './constants';
import { RefreshTokenService } from './refreshToken/refreshToken.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CryptoJS = require('crypto-js');

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  async getUserDataByEmailAndPassword(userData: LoginUserData) {
    const userDbData = await this.databaseService.getUserData(userData);
    const { password, ...result } = userDbData[0];
    const passwordBytes = CryptoJS.DES.decrypt(
      password,
      process.env.PASSWORD_ENCRYPTION_KEY,
    );
    const decryptedPassword = passwordBytes.toString(CryptoJS.enc.Utf8);
    if (userData.password !== decryptedPassword) return null;
    return result;
  }

  async login(user: any) {
    const payload = user;
    const refreshToken = this.jwtService.sign(
      { id: payload.person_id },
      { expiresIn: jwtConstants.refreshTokenExpiryTime },
    );
    const insertReturnValue = await this.refreshTokenService.insertRefreshToken(
      refreshToken,
      payload.person_id,
    );
    console.log(insertReturnValue);
    if (insertReturnValue.affectedRows === 1) {
      return {
        access_token: this.jwtService.sign(payload),
        refresh_token: refreshToken,
      };
    } else {
      return null;
    }
  }
  async registerUser(userData: RegisterUserData) {
    const userOfEmail = await this.databaseService.getUserData(userData);
    if (userOfEmail && userOfEmail.length > 0) {
      return 'exists';
    }
    userData.password = CryptoJS.DES.encrypt(
      userData.password,
      process.env.PASSWORD_ENCRYPTION_KEY,
    ).toString();
    const registerUserData = await this.databaseService.registerUser(userData);
    if (registerUserData) {
      generateRegisterToken(
        registerUserData.insertId,
        userData.email,
        this.databaseService,
        this.mailService,
      );
      return 'successfull';
    }
  }
}

async function generateRegisterToken(
  personId: number,
  email: string,
  databaseService: DatabaseService,
  mailService: MailService,
): Promise<string> {
  const generatedToken = nanoid();
  const insertTokenStatus = await databaseService.insertRegisterToken(
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
  mailService.initMail(message);
  return generatedToken;
}
