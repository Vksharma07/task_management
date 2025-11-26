import { Controller, Post, Body, UseGuards, Get, Param, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ILooseObject } from 'interfaces';
import { GetTaskDto } from './dto/get-tasks.dto';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Post()
  async create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  @Patch()
  updateTask(@Body() requestBody: UpdateTaskDto) {
    return this.tasksService.updateTask(requestBody);
  }

  @Get("/assigned")
  getTasks(@Query() queryParams: GetTaskDto) {
    return this.tasksService.getTasks(queryParams);
  }
}
