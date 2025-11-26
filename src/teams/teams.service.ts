import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Team } from './team.entity';
import { User } from '../users/user.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamMember } from '../teamMembers/teamMembers.entity';
import { UsersService } from '../users/users.service';
import { ILooseObject } from 'interfaces';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) private teamRepo: Repository<Team>,
    @InjectRepository(TeamMember) private teamMemberRepo: Repository<TeamMember>,
    private usersService: UsersService, // ✅ inject service, not repository
  ) { }

  async create(dto: CreateTeamDto) {
    // 1️⃣ Check if team exists
    console.log('dto', dto)
    const team = await this.teamRepo.findOne({ where: { id: dto.teamId } });
    if (!team) {
      throw new NotFoundException(`Team with id ${dto.teamId} not found`);
    }
    console.log('team', team)

    // 2️⃣ Check if all teamMembers exist in User table
    let validUsers: any = [];
    if (dto.teamMembers && dto.teamMembers.length > 0) {
      validUsers = await this.usersService.findByIds(dto.teamMembers); // ✅ assign to outer variable
      console.log('validUsers', validUsers, typeof validUsers);

      if (validUsers.length !== dto.teamMembers.length) {
        const invalidIds = dto.teamMembers.filter(
          id => !validUsers.find((u: { id: number }) => u.id === id),
        );
        throw new BadRequestException(`Invalid user IDs: ${invalidIds.join(', ')}`);
      }
    }

    // 3️⃣ Insert data into team_member table
    const teamMembersToSave = validUsers.map((u: ILooseObject) => {
      console.log('user', u);
      const tm: ILooseObject = {};
      tm.userId = u.id;
      tm.team = team;
      return tm;
    });
    console.log('teamMembersToSave', teamMembersToSave);
    return this.teamMemberRepo.save(teamMembersToSave);
  }
}
