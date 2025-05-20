import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class Pagination {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit: number;
}
