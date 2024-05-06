import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET_NAME;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

@Injectable()
export class FileUploadService {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    });
  }

  async s3Upload(file: Buffer, bucket: string, name: string, mimetype: string) {
    const params = {
      Bucket: bucket,
      Key: name,
      Body: file,
      ContentType: mimetype,
      ACL: 'public-read',
      ContentDisposition: 'inline',
    };

    try {
      const data = await this.s3.upload(params).promise();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async uploadFile(file: Express.Multer.File) {
    console.log(file);
    const { originalname, buffer, mimetype } = file;

    return await this.s3Upload(buffer, AWS_S3_BUCKET, originalname, mimetype);
  }
}
