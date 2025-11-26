import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../teams/team.entity';
import { TeamsService } from '../teams/teams.service';
import { TeamMember } from './teamMembers.entity';

@Injectable()
export class TeamMembersService {
  constructor(
    @InjectRepository(TeamMember)
    private repo: Repository<TeamMember>,
    private teamsService: TeamsService
  ) {}

//   async create(name: string, teamId: number): Promise<TeamMember> {
//     // const team = await this.teamsService.find({teamId});
//     // if (!team) throw new NotFoundException('Team not found');

//     // const member = this.repo.create({ name, team });
//     // return this.repo.save(member);
//   }

  async findAll(): Promise<TeamMember[]> {
    return this.repo.find({ relations: ['team'] });
  }

  async findById(id: number): Promise<TeamMember> {
    const member = await this.repo.findOne({ where: { id }, relations: ['team'] });
    if (!member) throw new NotFoundException('Team member not found');
    return member;
  }

  async delete(id: number): Promise<void> {
    const member = await this.findById(id);
    await this.repo.remove(member);
  }
}
