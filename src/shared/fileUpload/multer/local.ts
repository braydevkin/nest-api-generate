import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import multer from 'multer';
import { UPLOADS_PATH } from '@config';
import path from 'path';
import { getUniqueFilenameFromFile, gigabytesToBytes } from '@utils';

function getLocalOptions(allowedMimes: string[], maxFileSizeInGb?: number, folderName?: string): MulterOptions {
    const fileSize = gigabytesToBytes(maxFileSizeInGb || 2);
    return {
        storage: multer.diskStorage({
            destination: path.resolve(UPLOADS_PATH, folderName),
            filename: function (req: any, file: Express.Multer.File, cb: any) {
                cb(null, getUniqueFilenameFromFile(file));
            },
        }),
        limits: {
            fileSize: fileSize,
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

export function getLocalVideoOptions(maxFileSize?: number): MulterOptions {
    const allowedMimes = ['video/mp4', 'video/mov', 'video/wmv', 'video/avi', 'video/flv'];
    const folderName = 'videos';
    return getLocalOptions(allowedMimes, maxFileSize, folderName);
}

export function getServiceAccountUploadOptions(maxFileSizeInGb?: number): MulterOptions {
    const allowedMimes = ['application/json'];
    const folderName = 'serviceAccounts';
    return getLocalOptions(allowedMimes, maxFileSizeInGb, folderName);
}
