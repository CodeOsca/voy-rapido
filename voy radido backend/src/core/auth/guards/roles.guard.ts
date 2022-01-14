import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/core/users/enums/role.enum';
import { SKIP_AUTH_KEY } from '../decorators/is-public.decorator';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const isPublic = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || isPublic) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (user) {
      const isAllow = requiredRoles.some((role) => user.role?.includes(role));
      if (!isAllow) throw new UnauthorizedException('No autorizado');
    }

    return true;
  }
}
