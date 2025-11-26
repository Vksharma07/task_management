import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Team } from '../teams/team.entity';

@Entity('team_member')
export class TeamMember {
  @PrimaryGeneratedColumn() // auto-increment integer
  id!: number;

  @Column()
  userId!: number;



  @ManyToOne(() => Team, { nullable: false, onDelete: 'CASCADE' })
  team!: Team;
}
