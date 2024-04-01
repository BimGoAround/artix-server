import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({ example: 'Buy milk' })
  title: string;

  @ApiProperty({ example: false })
  completed: boolean;
}
