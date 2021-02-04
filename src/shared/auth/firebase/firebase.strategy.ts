import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { FirebaseAuthStrategy } from './lib/firebase-auth.strategy';
import { FIREBASE_ADMIN_NAME } from '@aginix/nestjs-firebase-admin';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(FirebaseAuthStrategy, FIREBASE_ADMIN_NAME) {
    public constructor() {
        super({
            extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }
}
