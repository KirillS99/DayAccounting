import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { UserEntity } from 'src/user/user.entity';
import {
  DeleteResult,
  LessThanOrEqual,
  MoreThanOrEqual,
  Raw,
  Repository,
} from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { DateDto } from './dto/date.dto';
import { ReportEntity } from './report.entity';

interface ICreateReport {
  reportData: CreateReportDto;
  userData: string;
}
interface IDeleteReport {
  id: string;
  userData: string;
}
interface IUpdateReport {
  id: string;
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
    const { text, totalTime, createdAt } = reportData;
    const report = new ReportEntity();
    const parsedUserData = JSON.parse(userData);

    const usersReportsByDay = await this.getReportsByTimeStamp({
      date: createdAt.toString(),
    });

    const userReportByDay = usersReportsByDay.filter(
      (t) => t.user.id === parsedUserData.id,
    );

    if (userReportByDay.length) {
      throw new BadRequestException('You have a report today');
    }

    report.created_at = reportData.createdAt;
    report.user = parsedUserData;
    report.updated_at = new Date();
    report.text = text;
    report.total_time = totalTime;
    return await this.reportsRepository.save(report);
  }

  public async updateReport({
    id,
    reportData,
    userData,
  }: IUpdateReport): Promise<ReportEntity> {
    const { createdAt, text, totalTime } = reportData;
    const report = new ReportEntity();
    const parsedUserData = JSON.parse(userData);

    const userReport = await this.reportsRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    if (!userReport) {
      throw new NotFoundException();
    }

    if (userReport.user.id !== parsedUserData.id) {
      throw new BadRequestException(
        "You don't have permissions to update other user's reports",
      );
    }

    report.created_at = createdAt;
    report.updated_at = new Date();
    report.text = text;
    report.id = Number(id);
    report.total_time = totalTime;

    return await this.reportsRepository.save(report);
  }

  public async deleteReport({ id, userData }: IDeleteReport): Promise<string> {
    const parsedUserData = JSON.parse(userData);

    const userReport = await this.reportsRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    if (!userReport) {
      throw new NotFoundException();
    }

    if (userReport.user.id !== parsedUserData.id) {
      throw new BadRequestException(
        "You don't have permissions to delete other user's reports",
      );
    }
    try {
      await this.reportsRepository.delete(id);
      return 'success';
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
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
