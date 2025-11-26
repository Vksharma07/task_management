import { IsString, IsOptional, IsDateString, IsNumber, IsEnum } from 'class-validator';
import { TaskStatus } from '../../common/status.enum'; // if you have an enum for status

export class CreateTaskDto {
  @IsString()
  description!: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsNumber()
  assigneeId?: number;

  @IsOptional()
  @IsNumber()
  teamId?: number;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
