import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import * as C from '../constants';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { HttpStatus as SC } from '@nestjs/common';
import { User as UserDecorator } from './decorators/user.decorator';
import type { User } from '@prisma/client';
import { Public } from './decorators/public.decorator';
import { Throttle } from '@nestjs/throttler';

const { AUTH, REGISTER, LOGIN, CURRENT_USER, REFRESH } = C.ROUTES;

@ApiTags(AUTH)
@Controller(AUTH)
export class AuthController {
  constructor(private authService: AuthService) {}

  //Register new user
  @HttpCode(SC.CREATED)
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: SC.CREATED,
    description: 'Successful registration',
    schema: {
      example: {
        accessToken: '...',
        refreshToken: '...',
      },
    },
  })
  @Public()
  @Throttle({ [C.MEDIUM_THROTTLER]: {} })
  @Post(REGISTER)
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  // login user
  @HttpCode(SC.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: SC.OK,
    description: 'Successful login',
    schema: {
      example: {
        accessToken: '...',
        refreshToken: '...',
      },
    },
  })
  @Public()
  @Throttle({ [C.MEDIUM_THROTTLER]: {} })
  @Post(LOGIN)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @HttpCode(SC.OK)
  @ApiOperation({ summary: 'Refresh tokens' })
  @ApiResponse({
    status: SC.OK,
    description: 'New access and refresh tokens',
    schema: {
      example: {
        accessToken: '...',
        refreshToken: '...',
      },
    },
  })
  @Public()
  @Throttle({ [C.MEDIUM_THROTTLER]: {} })
  @Post(REFRESH)
  refresh(@Body() body: { refreshToken: string }) {
    return this.authService.refresh(body.refreshToken);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({
    status: SC.OK,
    description: 'Current user info',
  })
  @Get(CURRENT_USER)
  me(@UserDecorator() user: User) {
    return this.authService.me(user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@UserDecorator() user: User) {
    return this.authService.logout(user.id);
  }
}
