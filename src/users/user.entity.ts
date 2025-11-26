import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Team } from '../teams/team.entity';
import { Task } from '../tasks/task.entity';

@Entity("user")
export class User {
  @PrimaryGeneratedColumn() // auto-increment int
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  name!: string;

  @ManyToOne(() => Team, (team) => team.members, { nullable: true, onDelete: 'SET NULL' })
  team?: Team;

  @OneToMany(() => Task, task => task.assignee)
  tasks?: Task[];
}
