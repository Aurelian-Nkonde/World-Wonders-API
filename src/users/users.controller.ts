import {
  Controller,
  Get,
  HttpStatus,
  Next,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { NextFunction, Request, Response } from 'express';
import { UserEntity } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async getUsers(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      const respo = await this.usersService.getUsers();
      response.status(HttpStatus.OK).json(respo);
    } catch (error) {
      console.error('Error finding users');
      next(error);
    }
  }

  @Get('/:id')
  async getUser(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const id = request.params.id;
    try {
      const respo = await this.usersService.getUser(id);
      response.status(HttpStatus.OK).json(respo);
    } catch (error) {
      console.error('Error finding a user');
      next(error);
    }
  }

  @Post()
  async createUser(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { name, email, password } = request.body;
    try {
      const newUserObject: UserEntity = {
        userId: '',
        name: name,
        email: email,
        password: password,
        role: undefined,
        activeStatus: undefined,
      };
      const respo = await this.usersService.createUser(newUserObject);
      response.status(HttpStatus.OK).json(respo);
    } catch (error) {
      console.error('Error creating a user');
      next(error);
    }
  }

  @Put('suspend/:id')
  async suspendUser(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ) {
    const id = request.params.id;
    try {
      const respo = await this.usersService.suspendUser(id);
      response.status(HttpStatus.OK).json(respo);
    } catch (error) {
      console.error('Error finding a user');
      next(error);
    }
  }

  @Put('activate/:id')
  async activateUser(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ) {
    const id = request.params.id;
    try {
      const respo = await this.usersService.activateUser(id);
      response.status(HttpStatus.OK).json(respo);
    } catch (error) {
      console.error('Error finding a user');
      next(error);
    }
  }
}
