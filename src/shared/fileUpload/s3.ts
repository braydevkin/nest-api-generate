import AWS from 'aws-sdk';
import { AWS_SECRET, AWS_ID } from '@config/Constants';

export const S3 = new AWS.S3({
    accessKeyId: AWS_ID,
    secretAccessKey: AWS_SECRET,
});
