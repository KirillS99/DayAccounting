import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { BaseGuard } from './base.gurad';

@Injectable()
export default class GoogleAuthGuard extends BaseGuard implements CanActivate {
  constructor(protected readonly authService: AuthService) {
    super(authService);
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers.authorization;
    const user = await this.authService.authenticateUserByGoogleApi(
      accessToken,
    );
    if (user) {
      request.userData = JSON.stringify(user);
      return true;
    }
    return false;
  }
}
