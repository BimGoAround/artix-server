import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'Tien Thinh', required: false })
  username?: string;

  @ApiProperty({ example: 'Thinh123@', required: false })
  password?: string;

  @ApiProperty({ example: 'url.com', required: false })
  avatar?: string;

  refreshToken?: string;
}
