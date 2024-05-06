import { Module } from '@nestjs/common';
import { DrawFileService } from './draw-file.service';
import { DrawFileController } from './draw-file.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [DrawFileService],
  controllers: [DrawFileController],
  imports: [PrismaModule],
})
export class DrawFileModule {}
