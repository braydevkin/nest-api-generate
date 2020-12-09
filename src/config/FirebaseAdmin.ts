import { AppOptions } from 'firebase-admin';
import * as admin from 'firebase-admin';

import {
    FIREBASE_ADMIN_SERVICE_CLIENT_EMAIL,
    FIREBASE_ADMIN_SERVICE_PRIVATE_KEY,
    FIREBASE_ADMIN_SERVICE_PROJECT_ID,
} from './Constants';
export const FirebaseAdminConfig: AppOptions = {
    credential: admin.credential.cert({
        clientEmail: FIREBASE_ADMIN_SERVICE_CLIENT_EMAIL,
        privateKey: FIREBASE_ADMIN_SERVICE_PRIVATE_KEY,
        projectId: FIREBASE_ADMIN_SERVICE_PROJECT_ID,
    }),
    databaseURL: 'https://decoleapp-f4e9a.firebaseio.com',
};
