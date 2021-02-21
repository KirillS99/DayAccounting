import { HttpService, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HttpModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), HttpModule],
  providers: [UserService, AuthService],
  controllers: [UserController],
})
export class UserModule {}
