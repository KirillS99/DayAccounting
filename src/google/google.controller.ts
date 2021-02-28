import {
  Controller,
  Get,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { GoogleService } from './google.service';
import { AuthGuard } from '@nestjs/passport';
import * as express from 'express';
import GoogleAuthGuard from './google.guard';

@Controller('google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get()
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req, @Res() res, @Query() query) {
    res.cookie('authRedirect', query.authRedirect);
    res.redirect('/api/google/redirect');
    return;
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: express.Response) {
    const { user } = this.googleService.googleLogin(req);
    if (user) {
      await this.googleService.checkUser(user);
      const redirectUrl = req.cookies.authRedirect;
      return res.redirect(303, `${redirectUrl}/login/${user.accessToken}`);
    }

    throw new UnauthorizedException();
  }
}
