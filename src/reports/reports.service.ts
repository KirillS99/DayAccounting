import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportEntity } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ReportEntity)
    private reportsRepository: Repository<ReportEntity>,
  ) {}

  public async createReport(): Promise<ReportEntity> {
    const report = new ReportEntity();
    report.date = new Date();

    return await this.reportsRepository.save(report);
  }
}
