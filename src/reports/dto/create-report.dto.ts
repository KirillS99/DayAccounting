import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsNumber()
  totalTime: number;

  @IsNotEmpty()
  @IsString()
  createdAt: Date;
}
