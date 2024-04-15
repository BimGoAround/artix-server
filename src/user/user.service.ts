import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as AWS from 'aws-sdk';

import { UpdateUserDto } from './dto/update-user.dto';

const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET_NAME;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

@Injectable()
export class UserService {
  s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  });
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const data = {
        ...createUserDto,
        createdAt: new Date(),
      };

      return this.prismaService.user.create({
        data,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: string) {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  // TODO: just for development purposes
  async findAll() {
    return this.prismaService.user.findMany();
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }

      return this.prismaService.user.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: string) {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }

  // #region helper
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
  // #endregion
}
