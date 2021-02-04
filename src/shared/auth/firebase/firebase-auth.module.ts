import { Module } from '@nestjs/common';
import { FirebaseAdminConfig } from '@/config';
import { FirebaseStrategy } from './firebase.strategy';
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';

const firebaseAdminModule = FirebaseAdminModule.forRootAsync({
    useFactory: () => FirebaseAdminConfig,
});
@Module({
    providers: [FirebaseStrategy],
    imports: [firebaseAdminModule],
    exports: [FirebaseStrategy, firebaseAdminModule],
})
export class FirebaseAuthModule {}
