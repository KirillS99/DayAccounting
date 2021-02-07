import { Injectable } from '@nestjs/common';
import IGoogleUser from 'src/shared/models/Google';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleService {
  constructor(private userSerivce: UserService) {}
  googleLogin(req) {
    if (!req.user) {
      return {
        message: 'No user from google',
      };
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  async checkUser(googleUser: IGoogleUser) {
    const isUserExistsInDB = await this.userSerivce.checkUserExistenceByGoogleUser(
      googleUser,
    );
    if (!isUserExistsInDB) await this.userSerivce.createUser(googleUser);
  }
}
