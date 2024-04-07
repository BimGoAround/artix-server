import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: 'tienthinh@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Thinh123@' })
  password: string;
}
