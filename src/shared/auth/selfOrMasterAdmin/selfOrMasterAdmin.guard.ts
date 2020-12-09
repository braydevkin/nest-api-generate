import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { TokenInfos } from '@shared/models';
import { canAccess } from '@/utils/AuthUtils';
import { ROLES } from '@/config/Constants';

@Injectable()
export class SelfOrMasterAdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();

        const { id } = request.params;

        const user: TokenInfos = request.user;

        if (!user) {
            return false;
        }

        const isSelfUser = user._id === id;

        const isMarterAdmin = canAccess(user.roles, [ROLES.ADMIN]);

        return isSelfUser || isMarterAdmin;
    }
}
