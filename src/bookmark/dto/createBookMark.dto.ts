import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';

export class CreateBookMarkDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  title: string;

  @ApiProperty()
  @IsString()
  @Length(0, 500)
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  link: string;
}
