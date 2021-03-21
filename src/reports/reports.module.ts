import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { ReportEntity } from './report.entity';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReportEntity]),
    TypeOrmModule.forFeature([UserEntity]),
    HttpModule,
  ],
  controllers: [ReportsController],
  providers: [ReportsService, AuthService, UserService],
})
export class ReportsModule {}
