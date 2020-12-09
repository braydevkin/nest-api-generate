import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt/jwt.strategy';
import { FirebaseAdminModule } from '../firebase-admin/firebase-admin.module';
import { FirebaseAdminConfig } from '@/config';
import { FirebaseStrategy } from './firebase/firebase.strategy';

const firebaseAdminModule = FirebaseAdminModule.forRootAsync({
    useFactory: () => FirebaseAdminConfig,
});
@Module({
    providers: [JwtStrategy, FirebaseStrategy],
    imports: [firebaseAdminModule],
    exports: [JwtStrategy, FirebaseStrategy, firebaseAdminModule],
})
export class AuthModule {}
