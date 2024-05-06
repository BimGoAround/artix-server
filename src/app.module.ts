import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TodoModule } from './todo/todo.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { DrawFileModule } from './draw-file/draw-file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TodoModule,
    PrismaModule,
    UserModule,
    AuthModule,
    FileUploadModule,
    DrawFileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
