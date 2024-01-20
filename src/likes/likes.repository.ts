import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Like } from './likes.model';
import { LikeEntity } from './likes.entity';
import { generateLikeId } from 'src/utils/generateLikeId';

@Injectable()
export class LikesRepository {
  constructor(
    @InjectModel(Like)
    private likeModel: typeof Like,
  ) {}

  async createLike(data: LikeEntity): Promise<LikeEntity> {
    const createdLike = await this.likeModel.create({
      likeId: generateLikeId(),
      wonderId: data.wonderId,
      userId: data.userId,
      liked: true,
    });
    return createdLike;
  }

  async findLikes(): Promise<LikeEntity[]> {
    return await this.likeModel.findAll();
  }

  async findLike(id: string): Promise<LikeEntity> {
    return await this.likeModel.findOne({ where: { likeId: id } });
  }

  async likeProduct(id: string): Promise<LikeEntity> {
    await this.likeModel.update({ liked: true }, { where: { likeId: id } });
    return this.findLike(id);
  }

  async unLikeProduct(id: string): Promise<LikeEntity> {
    await this.likeModel.update({ liked: false }, { where: { likeId: id } });
    return this.findLike(id);
  }
}
