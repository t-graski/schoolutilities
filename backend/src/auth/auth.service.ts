import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { nanoid } from 'nanoid';
import { DatabaseService } from 'src/database/database.service';
import { MailService } from 'src/mail/mail.service';
import {
  LoginUserData,
  RegisterUserData,
} from 'src/types/User';
import { jwtConstants } from './constants';
import { RefreshTokenService } from './refreshToken/refreshToken.service';
import { PrismaClient } from '@prisma/client';
import { RETURN_DATA } from 'src/misc/parameterConstants';
import { Role } from 'src/roles/role.enum';
import { HelperService } from 'src/helper/helper.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly helper: HelperService
  ) { }

  async getUserDataByEmailAndPassword(userData: LoginUserData) {
    const userDbData = await this.databaseService.getUserData(userData);
    const { password, ...result } = userDbData;

    if (bcrypt.compareSync(userData.password, password)) {
      return result;
    }
    return null;
  }

  async getRoles(request): Promise<any> {
    const jwt = await this.helper.extractJWTToken(request);
    const requesterId = await this.helper.getUserIdfromJWT(jwt);
    const { userUUID, schoolUUID } = request.body;
    const userId = await this.helper.getUserIdByUUID(userUUID);
    const schoolId = await this.helper.getSchoolIdByUUID(schoolUUID);
    const requesterRoles = await this.helper.getUserRoleBySchool(requesterId, schoolId);
    const required = [1, 2];
    if (required.includes(requesterRoles) || (requesterId == userId)) {
      const roles = await prisma.schoolUserRoles.findUnique({
        where: {
          user_school_unique: {
            userId: Number(userId),
            schoolId: Number(schoolId),
          },
        },
        select: {
          schoolId: true,
          schoolRoleId: true,
        },
      });

      const rolesItem = {
        schoolUUID,
        role: roles.schoolRoleId,
        roleName: await this.getRoleNameById(roles.schoolRoleId.toString()),
      }

      return rolesItem;
    }
    return {
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Unauthorized',
    };
  }

  async isPermitted(
    personUUID: string,
    requiredRoles: Role[],
    schoolId: number,
  ): Promise<boolean> {
    const personId = await this.getPersonIdByUUID(personUUID);
    const requiredRole = requiredRoles[0];
    const roleId = await this.getRoleIdByName(requiredRole);
    const hasRole = await prisma.schoolUserRoles.findMany({
      where: {
        userId: Number(personId.userId),
        schoolId: Number(schoolId),
        schoolRoleId: Number(roleId.roleId),
      },
    });
    return hasRole.length > 0;
  }

  async getUserRoleName(personUUID: string, schoolId: number): Promise<any> {
    const personId = await this.getPersonIdByUUID(personUUID);
    const roleName = await prisma.schoolUserRoles.findMany({
      where: {
        userId: Number(personId.userId),
        schoolId: Number(schoolId),
      },
    });
    if (roleName.length > 0) {
      return this.getRoleNameById(roleName[0].schoolRoleId.toString());
    } else {
      return null;
    }
  }

  async getRoleNameById(roleId: string): Promise<string> {
    const roleName = await prisma.schoolRoles.findFirst({
      where: {
        schoolRoleId: Number(roleId),
      },
      select: {
        schoolRoleName: true,
      },
    });
    return roleName.schoolRoleName;
  }

  async getPersonIdByUUID(personUUID: string) {
    return await prisma.users.findFirst({
      where: {
        userUUID: personUUID,
      },
      select: {
        userId: true,
      },
    });
  }

  async getRoleIdByName(roleName: string): Promise<any> {
    return await prisma.schoolRoles.findFirst({
      where: {
        schoolRoleName: roleName,
      },
      select: {
        schoolRoleId: true,
      },
    });
  }

  async personIsVerified(personUUID: string): Promise<boolean> {
    const personId = await this.databaseService.getPersonIdByUUID(personUUID);
    const person = await prisma.users.findFirst({
      where: {
        userId: Number(personId),
      },
      select: {
        userEmailVerified: true,
      },
    });
    return person.userEmailVerified;
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

    await this.refreshTokenService.insertRefreshToken(
      refreshToken,
      await this.databaseService.getPersonIdByUUID(personUUID),
    );

    await prisma.users.update({
      where: {
        userUUID: personUUID,
      },
      data: {
        userLastLoginTimestamp: new Date(Date.now()),
      },
    });

    return {
      access_token: this.jwtService.sign({ personUUID }),
      refresh_token: refreshToken,
    };
  }

  async mobileLogin(user: any) {
    const payload = user;
    const personUUID = await this.databaseService.getUserUUIDByEmail(
      payload.email,
    );

    const refresToken = this.jwtService.sign(
      { id: { personUUID } },
      { expiresIn: jwtConstants.refreshTokenExpiryTime },
    );

    await this.refreshTokenService.insertRefreshToken(
      refresToken,
      await this.databaseService.getPersonIdByUUID(personUUID),
    );

    await prisma.users.update({
      where: {
        userUUID: personUUID,
      },
      data: {
        userLastLoginTimestamp: new Date(Date.now()),
      },
    });

    return {
      access_token: this.jwtService.sign({ personUUID }, { expiresIn: '90d' }),
      refresh_token: refresToken,
    };
  }

  async decodeJWT(jwt: string): Promise<any> {
    return this.jwtService.decode(jwt);
  }

  async registerUser(body: RegisterUserData) {
    body.password = await bcrypt.hash(body.password, 10);

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
    await prisma.userRegisterTokens.create({
      data: {
        users: {
          connect: {
            userId: Number(userId['personId']),
          },
        },
        userRegisterToken: generatedToken,
      },
    });
  } catch (error) {
    throw new Error('Error while generating token: ' + error);
  }

  const text = `Please confirm your registration by clicking at this link: http://localhost:3000/auth/register?token=${generatedToken}`;
  const html = `Please confirm your registration by clicking at this link: http://localhost:3000/auth/register?token=${generatedToken}`;
  const message = {
    from: 'noreply@schoolutilities.net',
    to: email,
    subject: 'Registrierungsbestätigung - Schoolutilities',
    text,
    html,
  };
  mailService.sendMail(message);
  return generatedToken;
}
