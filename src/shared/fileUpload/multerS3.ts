import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3 } from './s3';
import { AWS_BUCKET } from '@config/Constants';
import path from 'path';
import { getUniqueFilenameFromPath } from '@/utils/UniqueUtils';

export default {
    storage: multerS3({
        s3: S3,
        bucket: AWS_BUCKET,
        acl: 'public-read',
        cacheControl: 'max-age=31536000',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, getUniqueFilenameFromPath(file.originalname));
        },
    }),
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req: any, file: any, cb: any) => {
        const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type.'));
        }
    },
};
