import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';
import { Role, RoleOrder } from './role.enum';
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

    const jwtArray = Object.keys(jwt).map((key) => jwt[key]);
    const personUUID = jwtArray[0];
    
    if (requiredRoles.includes(Role.Supervisor)) {
      if (personUUID.startsWith(ID_STARTERS.INTERNAL)) return true;
      return false;
    }

    const schoolId = request.body.schoolId;
    const userRoleName = await this.authService.getUserRoleName(
      personUUID,
      schoolId,
    );

    if (personUUID.startsWith(ID_STARTERS.INTERNAL)) return true;

    if (RoleOrder[userRoleName] < RoleOrder[requiredRoles[0]]) return true;

    return await this.authService.isPermitted(
      personUUID,
      requiredRoles,
      schoolId,
    );
  }
}
