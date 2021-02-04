export interface S3UploadedFile {
    fieldname: string;
    originalname: string;
    encoding: '7bit' | string;
    mimetype: string;
    size: number;
    bucket: string;
    key: string;
    acl: 'public-read' | string;
    contentType: string;
    contentDisposition?: any;
    storageClass: 'STANDARD' | string;
    serverSideEncryption?: any;
    metadata?: any;
    location: string;
    etag: string;
    versionId?: string;
}
