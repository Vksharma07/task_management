import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Task } from '../tasks/task.entity';

@Entity("team")
export class Team {
  @PrimaryGeneratedColumn() // auto-increment int
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => User, (user) => user.team, { cascade: true })
  members?: User[];

  @OneToMany(() => Task, task => task.team)
  tasks?: Task[];
}
