import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILooseObject } from 'interfaces';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) { }

  async create(data: { email: string; name: string; teamId?: string }): Promise<User> {
    const user = this.repo.create({ email: data.email, name: data.name });
    return this.repo.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  async find(whereCondition: ILooseObject): Promise<User | null> {
    return this.repo.findOne({ where: whereCondition });
  }

  async findByIds(ids: number[]): Promise<User[]> {
    if (!ids || !ids.length) return [];
    return this.repo.find({ where: { id: In(ids) } });
  }
}
