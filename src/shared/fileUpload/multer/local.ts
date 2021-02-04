import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import multer from 'multer';
import { UPLOADS_PATH } from '@config';
import path from 'path';
import { getUniqueFilenameFromFile, gigabytesToBytes } from '@utils';

function getLocalOptions(allowedMimes: string[], maxFileSizeInGb?: number, folderName?: string): MulterOptions {
    return {
        storage: multer.diskStorage({
            destination: path.resolve(UPLOADS_PATH, folderName),
            filename: function (req: any, file: Express.Multer.File, cb: any) {
                cb(null, getUniqueFilenameFromFile(file));
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

export function getLocalVideoOptions(maxFileSize?: number): MulterOptions {
    const allowedMimes = ['video/mp4', 'video/mov', 'video/wmv', 'video/avi', 'video/flv'];
    const folderName = 'videos';
    return getLocalOptions(allowedMimes, maxFileSize, folderName);
}

export function getLocalDocumentsVideoOptions(maxFileSizeInGb?: number): MulterOptions {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'application/pdf'];
    const folderName = 'documentos';
    return getLocalOptions(allowedMimes, maxFileSizeInGb, folderName);
}
