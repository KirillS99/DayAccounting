import {
  Controller,
  ForbiddenException,
  Get,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleService } from 'src/google/google.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleService: GoogleService,
  ) {}

  @UseGuards(AuthGuard('google'))
  @Get('user')
  async getUserData(@Req() req) {
    const { user } = this.googleService.googleLogin(req);
    if (user) {
      return user;
    }

    throw new ForbiddenException();
  }
}
