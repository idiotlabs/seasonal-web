import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Product } from './product.entity';
import { GoodsService } from './goods.service';

// @ApiSecurity('basic')
@Controller('goods')
export class GoodsController {
  constructor(private goodsService: GoodsService) {}

  @UseGuards(AuthGuard('bearer'))
  @Get()
  async findAll(): Promise<Product[]> {
    return this.goodsService.findAll();
  }

  @UseGuards(AuthGuard('bearer'))
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.goodsService.findOne(id);
  }
}
