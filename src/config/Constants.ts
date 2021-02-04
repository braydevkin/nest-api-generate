require('dotenv').config();
import { getDomainWithProtocols } from '@utils/CorsUtils';
import path from 'path';

// App
export const CORS_WHITE_LIST = [...getDomainWithProtocols('localhost:3000')];

export const APP_PORT = Number(process.env.PORT || process.env.APP_PORT);
export const APP_HOST = String(process.env.APP_HOST);
export const WEBSITE_HOST = String(process.env.WEBSITE_HOST);
export const ROOT_PATH = path.resolve(__dirname, '..', '..', '..');

export const UPLOADS_PATH = path.resolve(ROOT_PATH, 'uploads');

// Mongoose
export const MONGOOSE_CONNECTION_STRING = String(process.env.MONGOOSE_CONNECTION_STRING);

// AWS
export const AWS_SECRET = String(process.env.AWS_SECRET);
export const AWS_ID = String(process.env.AWS_ID);
export const AWS_BUCKET = String(process.env.AWS_BUCKET);

export enum ROLES {
    MASTER_ADMIN = 'MASTER-ADMIN',
    ADMIN = 'ADMIN',
    USER = 'USER',
}
