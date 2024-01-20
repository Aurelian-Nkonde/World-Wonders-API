import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Next,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { WondersService } from './wonders.service';
import { NextFunction, Request, Response } from 'express';

@Controller('wonders')
export class WondersController {
  constructor(private readonly wondersService: WondersService) {}

  @Get('/')
  async getWonders(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      const resp = await this.wondersService.getWonders();
      response.status(HttpStatus.OK).json(resp);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Get('/:id')
  async getWonder(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    try {
      const resp = await this.wondersService.getWonder(id);
      response.status(HttpStatus.OK).json(resp);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Post('/')
  async createWonder(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { name, country, image, description, continent } = request.body;
    try {
      const resp = await this.wondersService.createWonder(
        name,
        country,
        image,
        description,
        continent,
      );
      response.status(HttpStatus.OK).json(resp);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Put('/:id')
  async updateWonder(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { data } = request.body;
    const { id } = request.params;
    try {
      const resp = await this.wondersService.updateWonder(id, data);
      response.status(HttpStatus.OK).json(resp);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Delete('/:id')
  async deleteWonder(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    try {
      const resp = await this.wondersService.deleteWonder(id);
      response.status(HttpStatus.OK).json(resp);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
