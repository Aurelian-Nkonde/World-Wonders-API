import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserEntity } from './users.entity';
import * as bcrypt from 'bcrypt';
import { generateUserId } from 'src/utils/generateUserId';
import { userRole } from './enums/role.enum';
import { userStatus } from './enums/status.enum';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async createUser(data: UserEntity): Promise<UserEntity> {
    const userExist = await (
      await this.userRepository.findUsers()
    ).map((user) => user.email === data.email && user.name === data.name);
    if (userExist) {
      console.error('Error, the user already exists!');
      throw new Error(`This user ${data.name} already exists!`);
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser: UserEntity = {
      userId: generateUserId(),
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: userRole.USER,
      activeStatus: userStatus.ACTIVE,
    };
    await this.userRepository.createUser(newUser);
    return newUser;
  }

  async getUser(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findUser(id);
    if (!user) {
      console.error('Error finding the user');
      throw new Error('The user is not found');
    }
    return user;
  }

  async getUsers(): Promise<UserEntity[]> {
    const users = await this.userRepository.findUsers();
    if (!users) {
      console.error('Error finding users');
      throw new Error('Users are not found');
    }
    return users;
  }

  async suspendUser(id: string): Promise<UserEntity> {
    const suspend = await this.userRepository.suspendUser(id);
    console.log(suspend);
    return await this.userRepository.findUser(id);
  }

  async activateUser(id: string): Promise<UserEntity> {
    const activate = await this.userRepository.activateUser(id);
    console.log(activate);
    return await this.userRepository.findUser(id);
  }
}
