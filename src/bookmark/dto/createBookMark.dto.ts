import { IsNotEmpty, IsString } from 'class-validator';

export class createBookMarkDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description?: string;

  @IsNotEmpty()
  link: string;
}
