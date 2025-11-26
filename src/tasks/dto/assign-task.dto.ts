import { IsNumber } from 'class-validator';

export class UpdateTaskDto {
    @IsNumber()
    taskId!: number;

    @IsNumber()
    userId!: number;
}
