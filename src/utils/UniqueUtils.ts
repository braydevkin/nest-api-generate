import path from 'path';
import { sanitizeToURLSafe } from './RegexUtils';

export function getUniqueFilenameFromPath(originalName: string): string {
    return (
        Date.now() +
        path
            .parse(originalName)
            .name.replace(/[^a-z0-9]/gi, '_')
            .toLowerCase() +
        path.extname(originalName)
    );
}

export function getUniqueFilenameFromFile(file: Express.Multer.File): string {
    return `${sanitizeToURLSafe(path.parse(file.originalname).name)}__${Date.now()}${path.extname(file.originalname)}`;
}
