import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // #region helper functions
  async hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(id: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: id,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '1m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: id,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userService.update(id, {
      refreshToken: hashedRefreshToken,
    });
  }
  // #endregion

  async signUp(createUserDto: CreateUserDto) {
    try {
      const userExists = await this.userService.findByEmail(
        createUserDto.email,
      );

      if (userExists) {
        throw new BadRequestException('User already exists');
      }

      const hassPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUesr = await this.userService.create({
        ...createUserDto,
        password: hassPassword,
      });

      const tokens = await this.getTokens(newUesr.id, newUesr.email);
      await this.updateRefreshToken(newUesr.id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async signIn(data: SignInDto) {
    try {
      const user = await this.userService.findByEmail(data.email);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isPasswordMatching = await bcrypt.compare(
        data.password,
        user.password,
      );

      if (!isPasswordMatching) {
        throw new BadRequestException('Invalid password');
      }

      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRefreshToken(user.id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async logout(userId) {
    try {
      await this.userService.update(userId, {
        refreshToken: null,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async refreshTokens(userId: string, refreshToken: string) {
    try {
      const user = await this.userService.findById(userId);

      if (!user || !user.refreshToken) {
        throw new ForbiddenException('Access Denied');
      }

      const refreshTokenMatch = await bcrypt.compare(
        refreshToken,
        user.refreshToken,
      );

      if (!refreshTokenMatch) {
        throw new ForbiddenException('Access Denied');
      }

      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRefreshToken(user.id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
