import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDrawFileDto } from './dto/create-draw-file.dto';

@Injectable()
export class DrawFileService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.drawFile.findMany();
  }

  findOne(id: string) {
    return this.prismaService.drawFile.findUnique({
      where: {
        id,
      },
    });
  }

  findByAuthorId(authorId: string) {
    return this.prismaService.drawFile.findMany({
      where: {
        authorId,
      },
    });
  }

  async create(data: CreateDrawFileDto, authorEmail: string) {
    try {
      const author = await this.prismaService.user.findUnique({
        where: {
          email: authorEmail,
        },
      });

      if (!author) {
        throw new BadRequestException('Author not found');
      }

      return this.prismaService.drawFile.create({
        data: {
          ...data,
          author: {
            connect: {
              email: authorEmail,
            },
          },
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
