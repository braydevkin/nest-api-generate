import multerS3 from 'multer-s3';
import { AWS_BUCKET } from '@config/Constants';
import { S3 } from '../s3';
import { getUniqueFilenameFromPath, gigabytesToBytes } from '@/utils';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ALLOWED_IMAGE_MIMES, ALLOWED_VIDEO_MIMES } from './constants';

function getS3Options(allowedMimes: string[], maxFileSizeInGb?: number): MulterOptions {
    return {
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
            fileSize: gigabytesToBytes(maxFileSizeInGb || 2),
        },
        fileFilter: (req: Express.Request, file: Express.Multer.File, cb: any) => {
            if (allowedMimes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error('Invalid file type.'));
            }
        },
    };
}

export function getS3AttachmentOptions(maxFileSizeInGb?: number): MulterOptions {
    const allowedMimes = [
        'text/plain',
        'application/pdf',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
    ];
    return getS3Options(allowedMimes, maxFileSizeInGb);
}

export function getS3VideoOrImageOptions(maxFileSizeInGb?: number): MulterOptions {
    return getS3Options([...ALLOWED_VIDEO_MIMES, ...ALLOWED_IMAGE_MIMES], maxFileSizeInGb);
}
export function getS3ImageOptions(maxFileSizeInGb?: number): MulterOptions {
    return getS3Options(ALLOWED_IMAGE_MIMES, maxFileSizeInGb);
}
