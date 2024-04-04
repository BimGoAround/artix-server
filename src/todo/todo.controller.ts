import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TodoEntity } from './entities/todo.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('todo')
@ApiTags('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiBody({ type: CreateTodoDto })
  @ApiCreatedResponse({ type: TodoEntity })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  @ApiOkResponse({ type: TodoEntity, isArray: true })
  findAll() {
    return this.todoService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOkResponse({ type: TodoEntity })
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateTodoDto })
  @ApiOkResponse({ type: TodoEntity })
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: TodoEntity })
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
