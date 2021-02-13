import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ReportsModule } from './reports/reports.module';
import { ReportEntity } from './reports/report.entity';
import { GoogleModule } from './google/google.module';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { AuthModule } from './auth/auth.module';

const typeormConfig: TypeOrmModuleOptions = {
  entities: [ReportEntity, UserEntity],
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    ReportsModule,
    GoogleModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
