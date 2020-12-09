require('dotenv').config();
import { getDomainWithProtocols } from '@utils/CorsUtils';
import path from 'path';
// App
export const CORS_WHITE_LIST = [
    ...getDomainWithProtocols('localhost:3000'),
    ...getDomainWithProtocols('localhost:3333'),
];
export const APP_PORT = Number(process.env.PORT || process.env.APP_PORT);
export const APP_HOST = String(process.env.APP_HOST);
export const WEBSITE_HOST = String(process.env.WEBSITE_HOST);
export const ROOT_PATH = path.resolve(__dirname, '..', '..', '..');

export const UPLOADS_PATH = path.resolve(ROOT_PATH, 'uploads');

// Authentication
export const JWT_SALT = String(process.env.JWT_SALT);

// Firebase
export const FIREBASE_ADMIN_INJECT = 'firebase-admin';
export const FIREBASE_ADMIN_NAME = 'firebase-admin';
export const FIREBASE_ADMIN_MODULE_OPTIONS = 'FIREBASE_ADMIN_MODULE_OPTIONS';

export const FIREBASE_ADMIN_SERVICE_TYPE = String(process.env.FIREBASE_ADMIN_SERVICE_TYPE);
export const FIREBASE_ADMIN_SERVICE_PROJECT_ID = String(process.env.FIREBASE_ADMIN_SERVICE_PROJECT_ID);
export const FIREBASE_ADMIN_SERVICE_PRIVATE_KEY_ID = String(process.env.JWTFIREBASE_ADMIN_SERVICE_PRIVATE_KEY_ID_EXP);
export const FIREBASE_ADMIN_SERVICE_PRIVATE_KEY = String(process.env.FIREBASE_ADMIN_SERVICE_PRIVATE_KEY).replace(
    /\\n/g,
    '\n',
);
export const FIREBASE_ADMIN_SERVICE_CLIENT_EMAIL = String(process.env.FIREBASE_ADMIN_SERVICE_CLIENT_EMAIL);
export const FIREBASE_ADMIN_SERVICE_CLIENT_ID = String(process.env.FIREBASE_ADMIN_SERVICE_CLIENT_ID);
export const FIREBASE_ADMIN_SERVICE_AUTH_URI = String(process.env.FIREBASE_ADMIN_SERVICE_AUTH_URI);
export const FIREBASE_ADMIN_SERVICE_TOKEN_URI = String(process.env.FIREBASE_ADMIN_SERVICE_TOKEN_URI);
export const FIREBASE_ADMIN_SERVICE_AUTH_PROVIDER_X509_CERT_URL = String(
    process.env.FIREBASE_ADMIN_SERVICE_AUTH_PROVIDER_X509_CERT_URL,
);
export const FIREBASE_ADMIN_SERVICE_CLIENT_X509_CERT_URL = String(
    process.env.FIREBASE_ADMIN_SERVICE_CLIENT_X509_CERT_URL,
);
export const FIREBASE_ADMIN_DATABASE_URL = String(process.env.FIREBASE_ADMIN_DATABASE_URL);

export const DATABASE_HOST = String(process.env.DATABASE_HOST);
export const DATABASE_NAME = String(process.env.DATABASE_NAME);
export const DATABASE_USERNAME = String(process.env.DATABASE_USERNAME);
export const DATABASE_PASSWORD = String(process.env.DATABASE_PASSWORD);
export const DATABASE_PORT = Number(process.env.DATABASE_PORT);

export enum ROLES {
    MASTER_ADMIN = 'MASTER-ADMIN',
    ADMIN = 'ADMIN',
    USER = 'USER',
}
