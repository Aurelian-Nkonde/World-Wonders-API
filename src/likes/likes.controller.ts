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
import { LikesService } from './likes.service';
import { NextFunction, Request, Response } from 'express';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get('/')
  async getLikes(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      const respo = await this.likesService.getLikes();
      response.status(HttpStatus.OK).json(respo);
    } catch (error) {
      console.error('Error finding likes');
      next(error);
    }
  }

  @Get('/:id')
  async getLike(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    try {
      const respo = await this.likesService.getLike(id);
      response.status(HttpStatus.OK).json(respo);
    } catch (error) {
      console.error('Error finding a like');
      next(error);
    }
  }

  @Post('/')
  async createLike(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { data } = request.body;
    try {
      const respo = await this.likesService.createALike(data);
      response.status(HttpStatus.OK).json(respo);
    } catch (error) {
      console.error('Error creating a like');
      next(error);
    }
  }

  @Put('/:id')
  async likeProduct(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    try {
      const respo = await this.likesService.likeProduct(id);
      response.status(HttpStatus.OK).json(respo);
    } catch (error) {
      console.error('Error liking a product');
      next(error);
    }
  }

  @Put('/:id')
  async unlikeProduct(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    try {
      const respo = await this.likesService.unLikeProduct(id);
      response.status(HttpStatus.OK).json(respo);
    } catch (error) {
      console.error('Error unliking a product');
      next(error);
    }
  }
}
