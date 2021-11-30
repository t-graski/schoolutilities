import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { nanoid } from 'nanoid';
import { DatabaseService } from 'src/database/database.service';
import { MailService } from 'src/mail/mail.service';
import {
  LoginUserData,
  RegisterUserData,
  UserData,
  UserRole,
  UserRoleData,
} from 'src/types/User';
import { jwtConstants } from './constants';
import { RefreshTokenService } from './refreshToken/refreshToken.service';
import { PrismaClient } from '@prisma/client';
import { RETURN_DATA } from 'src/misc/parameterConstants';
import { Role } from 'src/roles/role.enum';

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
    const { password, ...result } = userDbData;
    const passwordBytes = CryptoJS.DES.decrypt(
      password,
      process.env.PASSWORD_ENCRYPTION_KEY,
    );
    const decryptedPassword = passwordBytes.toString(CryptoJS.enc.Utf8);

    if (userData.password !== decryptedPassword) return null;
    result.roles = await this.getRoles(result.personId);
    return result;
  }

  async getRoles(userId: number): Promise<UserRole[]> {
    const roles = await prisma.personRoles.findMany({
      where: {
        personId: Number(userId),
      },
      select: {
        schoolId: true,
        roleId: true,
      },
    });
    return roles;
  }

  async isPermitted(
    personUUID: string,
    requiredRoles: Role[],
    schoolId: number,
  ): Promise<boolean> {
    const personId = await this.getPersonIdByUUID(personUUID);
    const requiredRole = requiredRoles[0];
    const roleId = await this.getRoleIdByName(requiredRole);
    const hasRole = await prisma.personRoles.findMany({
      where: {
        personId: Number(personId.personId),
        roleId: Number(roleId.roleId),
        schoolId: Number(schoolId),
      },
    });
    return hasRole.length > 0;
  }

  async getUserRoleName(personUUID: string, schoolId: number): Promise<any> {
    const personId = await this.getPersonIdByUUID(personUUID);
    const roleName = await prisma.personRoles.findMany({
      where: {
        personId: Number(personId.personId),
        schoolId: Number(schoolId),
      },
    });
    if (roleName.length > 0) {
      return this.getRoleNameById(roleName[0].roleId.toString());
    } else {
      return null;
    }
  }

  async getRoleNameById(roleId: string): Promise<string> {
    const roleName = await prisma.roles.findFirst({
      where: {
        roleId: Number(roleId),
      },
      select: {
        roleName: true,
      },
    });
    return roleName.roleName;
  }

  async getPersonIdByUUID(personUUID: string) {
    return await prisma.persons.findFirst({
      where: {
        personUUID,
      },
      select: {
        personId: true,
      },
    });
  }

  async getRoleIdByName(roleName: string): Promise<any> {
    return await prisma.roles.findFirst({
      where: {
        roleName,
      },
      select: {
        roleId: true,
      },
    });
  }

  async login(user: any) {
    const payload = user;
    const personUUID = await this.databaseService.getUserUUIDByEmail(
      payload.email,
    );
    const refreshToken = this.jwtService.sign(
      { id: { personUUID } },
      { expiresIn: jwtConstants.refreshTokenExpiryTime },
    );

    const insertReturnValue = await this.refreshTokenService.insertRefreshToken(
      refreshToken,
      payload.person_id,
    );

    return {
      access_token: this.jwtService.sign({ personUUID }),
      refresh_token: refreshToken,
    };
  }

  async decodeJWT(jwt: string) {
    return this.jwtService.decode(jwt);
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
  mailService.sendMail(message);
  return generatedToken;
}
