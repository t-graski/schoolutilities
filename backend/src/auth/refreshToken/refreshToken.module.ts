import { Module } from '@nestjs/common';
import { JwtRefreshTokenStrategy } from './jwt-refresh-token.strategy';
import { RefreshTokenService } from './refreshToken.service';

@Module({
  providers: [RefreshTokenService, JwtRefreshTokenStrategy],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
