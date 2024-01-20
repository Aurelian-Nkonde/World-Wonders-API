import { Injectable } from '@nestjs/common';
import { LikesRepository } from './likes.repository';
import { LikeEntity } from './likes.entity';

@Injectable()
export class LikesService {
  constructor(private readonly likesRepository: LikesRepository) {}

  async createALike(data: LikeEntity): Promise<LikeEntity> {
    const createdLiked = await this.likesRepository.createLike(data);
    if (!createdLiked) {
      console.error('Error creating a like');
      throw new Error('Error creating a like');
    }
    return createdLiked;
  }

  async getLikes(): Promise<LikeEntity[]> {
    const likes = await this.likesRepository.findLikes();
    if (!likes) {
      console.error('Error finding likes');
      throw new Error('Error finding likes');
    }
    return likes;
  }

  async getLike(id: string): Promise<LikeEntity> {
    const like = await this.likesRepository.findLike(id);
    if (!like) {
      console.error('Error finding a like');
      throw new Error('Error finding a like');
    }
    return like;
  }

  async likeProduct(id: string): Promise<LikeEntity> {
    const like = await this.likesRepository.findLike(id);
    if (!like) {
      console.error('Error finding a like');
      throw new Error('Error finding a like');
    }
    const updatedLike = await this.likesRepository.likeProduct(id);
    if (!updatedLike) {
      console.error('Error liking a product');
      throw new Error('Error liking a product');
    }
    return updatedLike;
  }

  async unLikeProduct(id: string): Promise<LikeEntity> {
    const like = await this.likesRepository.findLike(id);
    if (!like) {
      console.error('Error finding a like');
      throw new Error('Error finding a like');
    }
    const updatedLike = await this.likesRepository.unLikeProduct(id);
    if (!updatedLike) {
      console.error('Error unliking a product');
      throw new Error('Error unliking a product');
    }
    return updatedLike;
  }
}
