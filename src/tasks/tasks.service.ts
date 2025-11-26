import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UsersService } from '../users/users.service';
import { TeamsService } from '../teams/teams.service';
import { Utils } from '../utils';
import { GetTaskDto } from './dto/get-tasks.dto';
import { ILooseObject } from 'interfaces';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private repo: Repository<Task>,
    private usersService: UsersService,
    private teamsService: TeamsService,
    private utils: Utils
  ) { }

  async create(task: CreateTaskDto) {
    const { assigneeId } = task;

    if (assigneeId) {
      const userData = await this.usersService.find({ id: assigneeId });
      if (!this.utils.isValidObject(userData))
        throw new NotFoundException('Invalid user id provided');
    }

    const tempTask = this.repo.create(task);
    return this.repo.save(tempTask);
  }

  async findAll(whereCondition: ILooseObject) {
    return this.repo.find(whereCondition);
  }

  // Update task details
  async update(id: number, dto: UpdateTaskDto) {
    const task = await this.repo.findOne({ where: { id } });
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);

    if (dto.description !== undefined) task.description = dto.description;
    if (dto.dueDate !== undefined) task.dueDate = dto.dueDate ? new Date(dto.dueDate) : null;

    return this.repo.save(task);
  }

  // Assign a task to a user
  async updateTask(dto: UpdateTaskDto) {
    const { taskId, description, dueDate, assigneeId, status } = dto;

    // 1️⃣ Validate task exists
    const task = await this.repo.findOne({ where: { id: taskId } });
    if (!task) throw new NotFoundException(`Task with id ${taskId} not found`);

    // 2️⃣ Update fields if provided
    if (description !== undefined) task.description = description;
    if (dueDate !== undefined) task.dueDate = dueDate ? new Date(dueDate) : null;
    if (status !== undefined) task.status = status;

    // 3️⃣ Handle assignee
    if (assigneeId !== undefined) {
      if (assigneeId === null) {
        task.assignee = undefined; // unassign
      } else {
        const user = await this.usersService.find({ id: assigneeId });
        if (!this.utils.isValidObject(user))
          throw new NotFoundException(`User with id ${assigneeId} not found`);
        task.assignee = user!;
      }
    }

    // 4️⃣ Save and return
    return this.repo.save(task);
  }

  async getTasks(queryParams: GetTaskDto) {
    const { assigneeId, taskId } = queryParams;

    if (assigneeId) {
      return this.repo.find({
        where: { assignee: { id: assigneeId } },
        relations: ['assignee'], // optional if you want to load assignee data
      });
    }

    if (taskId) {
      return this.repo.findOne({ where: { id: taskId }, relations: ['assignee'] });
    }

    // return all tasks if no filters
    return this.repo.find({ relations: ['assignee'] });
  }

}
