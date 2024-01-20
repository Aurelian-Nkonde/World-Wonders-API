import { Module } from '@nestjs/common';
import { WondersService } from './wonders.service';
import { WondersController } from './wonders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wonder } from './wonders.model';
import { WondersRepository } from './wonders.repository';

@Module({
  imports: [SequelizeModule.forFeature([Wonder])],
  controllers: [WondersController],
  providers: [WondersService, WondersRepository],
})
export class WondersModule {}
