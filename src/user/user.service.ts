import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
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
}
