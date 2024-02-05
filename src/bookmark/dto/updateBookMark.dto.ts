import { IsNotEmpty, IsString } from 'class-validator';

export class updateBookMarkDto {
  @IsNotEmpty()
  id: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}
