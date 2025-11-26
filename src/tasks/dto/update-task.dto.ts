import { IsOptional, IsString, IsDateString, IsEnum, IsNumber } from 'class-validator';
import { TaskStatus } from '../../common/status.enum';

export class UpdateTaskDto {

  @IsNumber({}, { message: 'taskId must be a number' })
  taskId!: number; // ✅ mandatory

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsNumber()
  assigneeId?: number | null;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
