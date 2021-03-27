import { IsNotEmpty, IsString } from 'class-validator';

export class DateDto {
  @IsNotEmpty()
  @IsString()
  date: string;
}
