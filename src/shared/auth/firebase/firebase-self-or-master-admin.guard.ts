import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { canAccess } from './utils';
import { ROLES } from '@/config/Constants';
import { FirebaseUser } from './types';

@Injectable()
export class FirebaseAuthSelfOrMasterAdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();

        const { id, uid } = request.params;

        const userId = id || uid;

        const user: FirebaseUser = request.user;

        if (!user) {
            return false;
        }

        const isSelfUser = user._id === userId;

        const isMarterAdmin = canAccess(user.roles, [ROLES.ADMIN]);

        return isSelfUser || isMarterAdmin;
    }
}
