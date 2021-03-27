import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { query, Request } from 'express';
import { CreateReportDto } from './dto/create-report.dto';
import { queue } from 'rxjs';
import { DateDto } from './dto/date.dto';
import GoogleAuthGuard from 'src/google/google.guard';
@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @UseGuards(GoogleAuthGuard)
  @Post('create')
  async createReport(@Body() createReportDto: CreateReportDto, @Req() req) {
    const report = await this.reportService.createReport({
      reportData: createReportDto,
      userData: req.userData,
    });
    return { report };
  }

  @Get('get-reports')
  async getReportsByTimestamp(@Query() query: DateDto) {
    const reports = await this.reportService.getReportsByTimeStamp({
      date: query.date,
    });
    return { reports };
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
