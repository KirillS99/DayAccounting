import { Controller, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Post('create')
  async createReport() {
    const report = await this.reportService.createReport();
    return { report };
  }
}
