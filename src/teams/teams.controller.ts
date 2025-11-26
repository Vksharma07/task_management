import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @Post()
  async create(@Body() requestBody: CreateTeamDto) {
    return this.teamsService.create(requestBody);
  }

}
