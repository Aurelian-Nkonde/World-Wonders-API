import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Wonder } from './wonders.model';
import { WonderEntity } from './wonders.entity';

@Injectable()
export class WondersRepository {
  constructor(
    @InjectModel(Wonder)
    private wonderModel: typeof Wonder,
  ) {}

  async findWonders(): Promise<WonderEntity[]> {
    return await this.wonderModel.findAll();
  }

  async findWonder(id: string): Promise<WonderEntity> {
    return await this.wonderModel.findOne({ where: { wonderId: id } });
  }

  async createWonder(data): Promise<WonderEntity> {
    return await this.wonderModel.create(data);
  }

  async updateWonder(id: string, data: any): Promise<WonderEntity> {
    const updated = await this.wonderModel.update(
      { data },
      {
        where: {
          wonderId: id,
        },
      },
    );
    console.log(updated);
    return await this.findWonder(id);
  }

  async deleteWonder(id: string) {
    return (
      await this.wonderModel.findOne({ where: { wonderId: id } })
    ).destroy();
  }
}
