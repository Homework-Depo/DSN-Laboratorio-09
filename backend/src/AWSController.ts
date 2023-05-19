import { S3 } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config()

const s3 = new S3({
  region: process.env.region,
  credentials: {
    accessKeyId: process.env.accessKeyId ?? '',
    secretAccessKey: process.env.secretAccessKey ?? ''
  }
});

export const uploadFile = async (req: Request, res: Response) => {

};