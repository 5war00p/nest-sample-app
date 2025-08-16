import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class CreateEpisodeDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  url: string;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsDate()
  @Type(() => Date)
  publishedAt: Date;
}
