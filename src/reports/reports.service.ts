import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportEntity } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ReportEntity)
    private reportsRepository: Repository<ReportEntity>,
  ) {}

  public async createReport({
    text,
    totalTime,
  }: CreateReportDto): Promise<ReportEntity> {
    const report = new ReportEntity();
    report.createdAt = new Date();
    report.text = text;
    report.totalTime = totalTime;

    return await this.reportsRepository.save(report);
  }

  public async updateReport({
    id,
    text,
    totalTime,
  }: CreateReportDto): Promise<ReportEntity> {
    const report = new ReportEntity();
    report.createdAt = new Date();
    report.text = text;
    report.totalTime = totalTime;

    return await this.reportsRepository.save({ id: Number(id), ...report });
  }
}
