import { Injectable, Catch, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import IGoogleUser from 'src/shared/models/Google';
import { Repository, QueryFailedError } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
@Catch(QueryFailedError)
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  public async createUser({
    email,
    picture,
    firstName,
    lastName,
  }: IGoogleUser): Promise<UserEntity> {
    const newUser = new UserEntity();
    newUser.createdAt = new Date();
    newUser.picture = picture;
    newUser.email = email;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    try {
      return await this.userRepository.save(newUser);
    } catch (e) {
      throw new BadRequestException();
    }
  }

  public async checkUserExistenceByGoogleUser(googleUser: IGoogleUser) {
    const user = await this.userRepository.findOne({
      where: { email: googleUser.email },
    });

    return Boolean(user);
  }

  public async getUserData(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    return user;
  }
}
