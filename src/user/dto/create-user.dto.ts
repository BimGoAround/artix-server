import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'tienthinh@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Tien Thinh' })
  username: string;

  @ApiProperty({ example: 'Thinh123@' })
  password: string;
}
