import { S3UploadedFile } from './S3UploadedFile';

export interface FileFieldsInterceptorS3Files {
    [fieldName: string]: S3UploadedFile[];
}
