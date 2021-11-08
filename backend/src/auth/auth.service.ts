import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { nanoid } from 'nanoid';
import { ReturnMessage } from 'src/types/Database';
import { DatabaseService } from 'src/database/database.service';
import { MailService } from 'src/mail/mail.service';
import { LoginUserData, RegisterUserData } from 'src/types/User';
import { jwtConstants } from './constants';
import { RefreshTokenService } from './refreshToken/refreshToken.service';
import { PrismaClient } from '@prisma/client';
import { RETURN_DATA } from 'src/misc/parameterConstants';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CryptoJS = require('crypto-js');
const prisma = new PrismaClient();

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
    if (insertReturnValue.affectedRows === 1) {
      return {
        access_token: this.jwtService.sign(payload),
        refresh_token: refreshToken,
      };
    } else {
      return null;
    }
  }

  async registerUser(body: RegisterUserData) {
    body.password = CryptoJS.DES.encrypt(
      body.password,
      process.env.PASSWORD_ENCRYPTION_KEY,
    ).toString();
    
    const registerUser = await this.databaseService.registerUser(body);
    if (registerUser.status === HttpStatus.OK) {
      generateRegisterToken(body.email, this.databaseService, this.mailService);
      return RETURN_DATA.SUCCESS;
    } else {
      return {
        status: registerUser.status,
        message: registerUser.message,
      };
    }
  }
}

async function generateRegisterToken(
  email: string,
  databaseService: DatabaseService,
  mailService: MailService,
): Promise<string> {
  const generatedToken = nanoid();
  const userId = await databaseService.getUserIdByEmail(email);

  try {
    await prisma.registerTokens.create({
      data: {
        persons: {
          connect: {
            personId: Number(userId['personId']),
          },
        },
        token: generatedToken,
      },
    });
  } catch (error) {
    throw new Error('Error while generating token: ' + error);
  }

  const text = `Please confirm your registration by clicking at this link: http://localhost:3000/auth/register?token=${generatedToken}`;
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
