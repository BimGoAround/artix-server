import { ApiProperty } from '@nestjs/swagger';
import { DrawFile, User } from '@prisma/client';

export class DrawFileEntity implements DrawFile {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  thumbnail: string;

  @ApiProperty()
  authorId: string;

  @ApiProperty()
  author: User;

  @ApiProperty()
  data: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
