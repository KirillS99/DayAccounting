import { HttpModule, HttpService, Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleController } from './google.controller';
import { GoogleStrategy } from './google.strategy';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), HttpModule],
  providers: [GoogleService, GoogleStrategy, UserService, AuthService],
  controllers: [GoogleController],
})
export class GoogleModule {}
