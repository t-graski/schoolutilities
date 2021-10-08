import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { jwtConstants } from '../constants';
import { JwtRefreshTokenStrategy } from './jwt-refresh-token.strategy';
import { RefreshTokenService } from './refreshToken.service';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '900s' },
    }),
  ],
  providers: [RefreshTokenService, JwtRefreshTokenStrategy],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
