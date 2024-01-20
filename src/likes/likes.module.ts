import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { LikesRepository } from './likes.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Like } from './likes.model';

@Module({
  controllers: [LikesController],
  providers: [LikesService, LikesRepository],
  imports: [SequelizeModule.forFeature([Like])],
})
export class LikesModule {}
