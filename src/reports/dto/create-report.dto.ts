import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  totalTime: number;
}
