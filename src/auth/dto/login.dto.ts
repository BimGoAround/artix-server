import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'tienthinh@gmail' })
  email: string;

  @ApiProperty({ example: 'Thinh123@' })
  password: string;
}
