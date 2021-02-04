import { FIREBASE_ADMIN_NAME } from '@aginix/nestjs-firebase-admin';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FirebaseRolesGuard } from '../firebase-roles.guard';
import { Roles } from '../../roles/roles.decorator';

export function FirebaseAuth(allowedRoles?: string[]): MethodDecorator {
    return applyDecorators(UseGuards(AuthGuard(FIREBASE_ADMIN_NAME), FirebaseRolesGuard), Roles(allowedRoles));
}
