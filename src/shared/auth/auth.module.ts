import { Module } from '@nestjs/common';
import { FirebaseAuthModule } from './firebase/firebase-auth.module';

@Module({
    providers: [],
    imports: [FirebaseAuthModule],
    exports: [FirebaseAuthModule],
})
export class AuthModule {}
