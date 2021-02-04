import { AppOptions } from 'firebase-admin';
import * as admin from 'firebase-admin';
import * as firebaseJson from '../../firebase.json';

export const FirebaseAdminConfig: AppOptions = {
    credential: admin.credential.cert({
        clientEmail: firebaseJson.client_email,
        privateKey: firebaseJson.private_key,
        projectId: firebaseJson.project_id,
    }),
};
