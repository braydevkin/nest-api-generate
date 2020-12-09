import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { FirebaseUser } from '@shared/models';
import { ROLES } from '@/config/Constants';

@Injectable()
export class FirebaseSelfOrMasterAdminGuard implements CanActivate {
    matchRoles(roles: string[], user: FirebaseUser): boolean {
        return roles.some((role) => (user[role] === undefined ? false : user[role] === true));
    }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();

        const { uid } = request.params;

        const user: FirebaseUser = request.user;

        if (!user) {
            return false;
        }

        const isSelfUser = user.uid === uid;

        const isMarterAdmin = this.matchRoles([ROLES.ADMIN], user);

        return isSelfUser || isMarterAdmin;
    }
}
