import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import GoogleAuthGuard from 'src/google/google.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('current-user')
  @UseGuards(GoogleAuthGuard)
  async currentUser(@Req() req) {
    return JSON.parse(req.userData);
  }
}
