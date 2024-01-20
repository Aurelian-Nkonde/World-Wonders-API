import { Injectable } from '@nestjs/common';
import { WondersRepository } from './wonders.repository';
import { WonderEntity } from './wonders.entity';
import { generateWonderId } from 'src/utils/generateWonderId';

@Injectable()
export class WondersService {
  constructor(private readonly wondersRepository: WondersRepository) {}

  async getWonders(): Promise<WonderEntity[]> {
    const wonders = await this.wondersRepository.findWonders();
    if (!wonders) {
      console.error('Error finding wonders');
      throw new Error('Wonders are not found');
    }
    return wonders;
  }

  async getWonder(id: string): Promise<WonderEntity> {
    const wonder = await this.wondersRepository.findWonder(id);
    if (!wonder) {
      console.error('Error finding a wonder');
      throw new Error('Wonder is not found');
    }
    return wonder;
  }

  async createWonder(
    name: string,
    country: string,
    image: string,
    description: string,
    continent: any,
  ): Promise<WonderEntity> {
    const newWonder: WonderEntity = {
      name: name,
      wonderId: generateWonderId(),
      country: country,
      image: image,
      description: description,
      likes: 0,
      isLiked: false,
      continent: continent,
    };
    const created = await this.wondersRepository.createWonder(newWonder);
    if (!created) {
      console.error('Error creating new wonder');
      throw new Error('Wonder is not created');
    }
    return created;
  }

  async updateWonder(id: string, data: any): Promise<WonderEntity> {
    const wonder = await this.wondersRepository.findWonder(id);
    if (!wonder) {
      console.error('Error finding a wonder');
      throw new Error('Wonder is not found');
    }
    const updatedWonder = await this.wondersRepository.updateWonder(id, data);
    if (!updatedWonder) {
      console.error('Error updating a wonder');
      throw new Error('Error updating wonder');
    }
    return updatedWonder;
  }

  async deleteWonder(id: string): Promise<string> {
    const findWonder = await this.wondersRepository.findWonder(id);
    if (!findWonder) {
      console.error('Error finding a wonder');
      throw new Error('Error finding a wonder');
    }
    const deleted = await this.wondersRepository.deleteWonder(id);
    console.log(deleted);
    return 'Wonder is deleted successfully';
  }
}
