import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { RefreshTokenService } from './refreshToken.service';
import { jwtConstants } from '../constants';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private readonly refreshTokenService: RefreshTokenService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.body?.token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any) {
    const refreshToken = request?.body?.token;
    const personUUID = payload.id.personUUID;
    const refreshTokenData = await this.refreshTokenService.getTokenData(
      refreshToken,
      personUUID,
    );
    if (!refreshTokenData) {
      throw new UnauthorizedException();
    }
    const newToken = await this.refreshTokenService.getNewJwtToken({
      personUUID,
    });
    return newToken;
  }
}
