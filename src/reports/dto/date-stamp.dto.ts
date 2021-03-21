import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DateStampDto {
  @IsNotEmpty()
  @IsNumber()
  timestampStart: number;

  @IsNotEmpty()
  @IsNumber()
  timestampEnd: number;
}
