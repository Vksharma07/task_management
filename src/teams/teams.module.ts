import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { TeamMember } from '../teamMembers/teamMembers.entity';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team, TeamMember]), // TeamMember included
    UsersModule, // imports UsersService
  ],
  providers: [TeamsService],
  controllers: [TeamsController],
  exports: [TeamsService], // only export what this module provides
})
export class TeamsModule {}
