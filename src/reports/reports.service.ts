import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { UserEntity } from 'src/user/user.entity';
import { LessThanOrEqual, MoreThanOrEqual, Raw, Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { DateDto } from './dto/date.dto';
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

    report.created_at = reportData.createdAt;
    report.user = parsedUserData;
    report.text = text;
    report.total_time = totalTime;
    console.log(report);
    return await this.reportsRepository.save(report);
  }

  public async updateReport({
    id,
    text,
    totalTime,
    createdAt,
  }: CreateReportDto): Promise<ReportEntity> {
    const report = new ReportEntity();
    report.created_at = createdAt;
    // report.updated_at = new Date();
    report.text = text;
    report.id = Number(id);
    report.total_time = totalTime;

    return await this.reportsRepository.save(report);
  }

  public async getReportsByTimeStamp({
    date,
  }: DateDto): Promise<ReportEntity[]> {
    const convertedDateStart = dayjs(date)
      .startOf('day')
      .format('YYYY-MM-DD HH:mm:ss');
    const convertedDateEnd = dayjs(date)
      .endOf('day')
      .format('YYYY-MM-DD HH:mm:ss');

    const filters = {
      before: convertedDateEnd,
      after: convertedDateStart,
    };

    console.log(filters);
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
