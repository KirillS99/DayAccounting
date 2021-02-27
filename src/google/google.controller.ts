import {
  Controller,
  Get,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { GoogleService } from './google.service';
import { AuthGuard } from '@nestjs/passport';
import * as express from 'express';

@Controller('google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    return;
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: express.Response) {
    const { user } = this.googleService.googleLogin(req);
    if (user) {
      await this.googleService.checkUser(user);
      return res.redirect(
        303,
        `${req.headers.referer}login/${user.accessToken}`,
      );
    }

    throw new UnauthorizedException();
  }
}
