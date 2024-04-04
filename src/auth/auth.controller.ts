import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @Post('/auth/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/auth/register')
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: 'User successfully registered' })
  async register(@Body() registerDto: CreateUserDto) {
    return this.authService.register(registerDto);
  }
}
