import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { DatabaseService } from 'src/database/database.service';
import { AuthService } from './auth.service';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
