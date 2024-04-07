import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'Tien Thinh', required: false })
  username?: string;

  @ApiProperty({ example: 'Thinh123@', required: false })
  password?: string;

  refreshToken?: string;
}
