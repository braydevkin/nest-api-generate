import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FirebaseUser } from '@shared/models';

@Injectable()
export class FirebaseRolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    matchRoles(roles: string[], user: FirebaseUser): boolean {
        return roles.some((role) => (user[role] === undefined ? false : user[role] === true));
    }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) return true;
        if (roles.length === 0) return true;

        const request = context.switchToHttp().getRequest();

        const user: FirebaseUser = request.user;

        if (!user) {
            return false;
        }

        return this.matchRoles(roles, user);
    }
}
