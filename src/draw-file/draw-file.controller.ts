import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { DrawFileService } from './draw-file.service';
import { CreateDrawFileDto } from './dto/create-draw-file.dto';
import { DrawFileEntity } from './entities/draw-file.entity';
import { Request } from 'express';
import { User } from '@prisma/client';

@Controller('draw-file')
@ApiTags('draw-file')
export class DrawFileController {
  constructor(private readonly drawFileService: DrawFileService) {}

  @Get()
  @ApiOkResponse({ type: DrawFileEntity, isArray: true })
  findAll() {
    return this.drawFileService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: DrawFileEntity })
  findOne(@Param('id') id: string) {
    return this.drawFileService.findOne(id);
  }

  @Get(':authorId')
  @ApiOkResponse({ type: DrawFileEntity, isArray: true })
  findByAuthorId(@Param('authorId') authorId: string) {
    return this.drawFileService.findByAuthorId(authorId);
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Post()
  @ApiBody({ type: CreateDrawFileDto })
  @ApiCreatedResponse({ type: DrawFileEntity })
  create(@Req() req: Request, @Body() createDrawFileDto: CreateDrawFileDto) {
    // console.log('req', req);

    const currentUser = req.user as User;

    try {
      const authorEmail = currentUser.email;

      if (!authorEmail) {
        throw new BadRequestException('Author Email not found in token');
      }

      return this.drawFileService.create(createDrawFileDto, authorEmail);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
