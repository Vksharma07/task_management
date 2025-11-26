import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { TeamsModule } from './teams/teams.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { Task } from './tasks/task.entity';
import { Team } from './teams/team.entity';
import { User } from './users/user.entity';
import { TeamMember } from './teamMembers/teamMembers.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'task_team_db',
      entities: [Task, Team, User,TeamMember],  // include all entities
      // synchronize: true,             // auto-create tables in dev
      // logging: true,                 // optional: see SQL queries
    })
    ,
    TasksModule,
    TeamsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule { }
