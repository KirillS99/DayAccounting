import { HttpService, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private httpService: HttpService,
    private userService: UserService,
  ) {
    this.httpService = new HttpService();
  }

  async authenticateUserByGoogleApi(token) {
    try {
      const response = await this.httpService
        .get(
          `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`,
        )
        .toPromise();
      return await this.userService.getUserData(response.data.email);
    } catch (e) {}
    return null;
  }
}
