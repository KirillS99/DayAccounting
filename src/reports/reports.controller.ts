import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Request } from 'express';
import { CreateReportDto } from './dto/create-report.dto';
@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Post('create')
  async createReport(@Body() createReportDto: CreateReportDto) {
    const report = await this.reportService.createReport(createReportDto);
    return { report };
  }

  @Post('update/:id')
  async updateReport(
    @Param('id') id: string,
    @Body() createReportDto: CreateReportDto,
  ) {
    const report = await this.reportService.updateReport({
      id,
      ...createReportDto,
    });
    return { report };
  }
}
