import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Team } from '../teams/team.entity';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn() // auto-increment int
  id!: number;

  @Column()
  description!: string;

  @Column()
  status?:string

  @Column({ type: 'datetime', nullable: true })
  dueDate?: Date | null;

  @Column({ nullable: true })
  metadata?: string;

  // Foreign key for assignee
  @Column({ nullable: true })
  assigneeId?: number;

  @ManyToOne(() => User, (user) => user.tasks, { nullable: true, eager: true })
  @JoinColumn({ name: 'assigneeId' })
  assignee?: User;

  // Foreign key for team
  @Column({ nullable: true })
  teamId?: number;

  @ManyToOne(() => Team, (team) => team.tasks, { nullable: true })
  @JoinColumn({ name: 'teamId' })
  team?: Team;
}
