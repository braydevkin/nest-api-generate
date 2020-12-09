import * as admin from 'firebase-admin';

export type FirebaseUser = admin.auth.DecodedIdToken;

export interface GoogleFirebaseUser extends FirebaseUser {
    name: string;
    piscture: string;
    email: string;
    email_verified: boolean;
}
