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
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
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
