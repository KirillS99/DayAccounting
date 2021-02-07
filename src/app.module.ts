import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ReportsModule } from './reports/reports.module';
import { ReportEntity } from './reports/report.entity';

const typeormConfig: TypeOrmModuleOptions = {
  entities: [ReportEntity],
  type: 'postgres',
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
  synchronize: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
