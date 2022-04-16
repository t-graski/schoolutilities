import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseUpdate } from 'src/types/Database';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const prisma = new PrismaClient();

@Injectable()
export class RefreshTokenService {
  connection: any;
  constructor(
    private readonly jwtService: JwtService,
  ) { }

  // async getTokenData1(refreshToken: string, personId): Promise<DatabaseUpdate> {
  //   return new Promise((resolve, reject) => {
  //     this.connection.query(
  //       'select refresh_token from `login_tokens` where refresh_token=? and person_id=?',
  //       [refreshToken, personId],
  //       function (error, results, fields) {
  //         resolve(results);
  //       },
  //     );
  //   });
  // }

  async getTokenData(refreshToken: string, personId: number) {
    return await prisma.loginTokens.findFirst({
      where: {
        refreshToken,
        personId,
      },
    });
  }

  // async insertRefreshToken(
  //   refreshToken: string,
  //   personId: string,
  // ): Promise<DatabaseUpdate> {
  //   return new Promise((resolve, reject) => {
  //     this.connection.query(
  //       'insert into `login_tokens` set person_id=?, refresh_token=?',
  //       [personId, refreshToken],
  //       function (error, results, fields) {
  //         resolve(results);
  //       },
  //     );
  //   });
  // }

  async insertRefreshToken(refreshToken: string, personId: number) {
    return await prisma.loginTokens.create({
      data: {
        personId,
        refreshToken,
      },
    });
  }

  // async deleteRefreshToken(refreshToken: string): Promise<DatabaseUpdate> {
  //   return new Promise((resolve, reject) => {
  //     this.connection.query(
  //       'delete from `login_tokens` where refresh_token=?',
  //       [refreshToken],
  //       function (error, results, fields) {
  //         resolve(results);
  //       },
  //     );
  //   });
  // }

  async deleteRefreshToken(refreshToken: string) {
    return await prisma.loginTokens.deleteMany({
      where: {
        refreshToken,
      },
    });
  }
  async getNewJwtToken(personUUID: any) {
    return this.jwtService.sign(personUUID);
  }
}
