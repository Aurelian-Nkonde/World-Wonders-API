import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WondersModule } from './wonders/wonders.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/users.model';
import { Wonder } from './wonders/wonders.model';
import { LikesModule } from './likes/likes.module';
import { Like } from './likes/likes.model';

@Module({
  imports: [
    UsersModule,
    LikesModule,
    WondersModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Thousand@90',
      database: 'wonders',
      models: [User, Wonder, Like],
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
