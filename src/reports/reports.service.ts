import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { UserEntity } from 'src/user/user.entity';
import { LessThanOrEqual, MoreThanOrEqual, Raw, Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { DateStampDto } from './dto/date-stamp.dto';
import { ReportEntity } from './report.entity';

interface ICreateReport {
  reportData: CreateReportDto;
  userData: string;
}
@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ReportEntity)
    private reportsRepository: Repository<ReportEntity>,
  ) {}

  public async createReport({
    reportData,
    userData,
  }: ICreateReport): Promise<ReportEntity> {
    const { text, totalTime } = reportData;
    const report = new ReportEntity();
    const parsedUserData = JSON.parse(userData);

    report.created_at = new Date();
    report.user = parsedUserData.id;
    report.text = text;
    report.total_time = totalTime;
    console.log(report);
    return await this.reportsRepository.save(report);
  }

  public async updateReport({
    id,
    text,
    totalTime,
  }: CreateReportDto): Promise<ReportEntity> {
    const report = new ReportEntity();
    report.created_at = new Date();
    report.text = text;
    report.total_time = totalTime;

    return await this.reportsRepository.save({ id: Number(id), ...report });
  }

  public async getReportsByTimeStamp({
    timestampStart,
    timestampEnd,
  }: DateStampDto): Promise<ReportEntity[]> {
    const convertedDateStart = dayjs
      .unix(timestampStart)
      .format('YYYY-MM-DD HH:mm:ss');
    const convertedDateEnd = dayjs
      .unix(timestampEnd)
      .format('YYYY-MM-DD HH:mm:ss');

    const filters = {
      before: convertedDateEnd,
      after: convertedDateStart,
    };

    const allReposts = await this.reportsRepository
      .createQueryBuilder('report')
      .select()
      .andWhere('created_at >= :after')
      .andWhere('created_at <= :before')
      .leftJoinAndSelect('report.user', 'user')
      .setParameters(filters)
      .getMany();

    return allReposts;
  }
}
