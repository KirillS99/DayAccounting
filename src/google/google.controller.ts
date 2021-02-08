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

@Controller('google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    return;
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const { user } = this.googleService.googleLogin(req);
    if (user) {
      await this.googleService.checkUser(user);
      return res.redirect(`/login/${user.accessToken}`);
    }

    throw new UnauthorizedException();
  }

  // @UseGuards(AuthGuard('google'))
  // async getUser(@Req() req) {
  //   const { user } = this.googleService.googleLogin(req);
  //   return user;
  // }
}
