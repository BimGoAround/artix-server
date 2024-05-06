import { ApiProperty } from '@nestjs/swagger';

export class CreateDrawFileDto {
  @ApiProperty({ example: 'My first draw file' })
  name: string;

  @ApiProperty({ example: 'https://example.com/my-first-draw-file.png' })
  thumbnail: string;
}
