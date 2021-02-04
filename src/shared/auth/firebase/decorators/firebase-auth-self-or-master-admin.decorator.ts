import { FIREBASE_ADMIN_NAME } from '@aginix/nestjs-firebase-admin';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FirebaseAuthSelfOrMasterAdminGuard } from '../firebase-self-or-master-admin.guard';

export function FirebaseAuthSelfOrMasterAdmin(): any {
    return applyDecorators(UseGuards(AuthGuard(FIREBASE_ADMIN_NAME), FirebaseAuthSelfOrMasterAdminGuard));
}
