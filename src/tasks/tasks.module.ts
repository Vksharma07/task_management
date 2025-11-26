import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { UsersModule } from '../users/users.module';
import { TeamsModule } from '../teams/teams.module';
import { Utils } from '../utils';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UsersModule, TeamsModule],
  providers: [TasksService,Utils],
  controllers: [TasksController],
})
export class TasksModule {}
