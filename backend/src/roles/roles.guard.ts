import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { ID_STARTERS } from '../misc/parameterConstants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const jwt = await this.authService.decodeJWT(
      request.headers.authorization.split(' ')[1],
    );

    const schoolId = request.body.schoolId;
    const jwtArray = Object.keys(jwt).map((key) => jwt[key]);
    const personUUID = jwtArray[0];

    if (personUUID.startsWith(ID_STARTERS.INTERNAL)) return true;

    return await this.authService.isPermitted(
      personUUID,
      requiredRoles,
      schoolId,
    );
  }
}
