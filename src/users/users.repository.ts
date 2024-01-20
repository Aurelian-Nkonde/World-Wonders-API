import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { userStatus } from './enums/status.enum';
import { UserEntity } from './users.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async createUser(data): Promise<UserEntity> {
    return await this.userModel.create(data);
  }

  async findUser(id: string): Promise<UserEntity> {
    return await this.userModel.findOne({
      where: {
        userId: id,
      },
    });
  }

  async findUsers(): Promise<UserEntity[]> {
    return await this.userModel.findAll();
  }

  async suspendUser(id: string) {
    return await this.userModel.update(
      { activeStatus: userStatus.UNACTIVE },
      {
        where: {
          userId: id,
        },
      },
    );
  }

  async activateUser(id: string) {
    return await this.userModel.update(
      { activeStatus: userStatus.ACTIVE },
      {
        where: {
          userId: id,
        },
      },
    );
  }
}
