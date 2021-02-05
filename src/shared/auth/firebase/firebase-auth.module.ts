import { Module } from '@nestjs/common';
import { FirebaseStrategy } from './firebase.strategy';
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';
import * as admin from 'firebase-admin';

const firebaseAdminModule = FirebaseAdminModule.forRootAsync({
    useFactory: () => ({
        credential: admin.credential.applicationDefault(),
    }),
});
@Module({
    providers: [FirebaseStrategy],
    imports: [firebaseAdminModule],
    exports: [firebaseAdminModule, FirebaseStrategy],
})
export class FirebaseAuthModule {}
