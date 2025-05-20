import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const user = context.switchToHttp().getRequest().user;

    if (!roles.length) {
      return true;
    }

    const rolesSet = new Set(roles);
    const userRolesSet = new Set(user.roles);
    const check = [...rolesSet].some((role) => userRolesSet.has(role));

    if (!check) {
      return false;
    }

    return true;
  }
}
