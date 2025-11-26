import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetTaskDto {
  @IsOptional()
  @Type(() => Number) // converts string -> number
  @IsNumber()
  taskId!: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  assigneeId!: number;
}
