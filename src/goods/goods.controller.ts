import { Controller, Get, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Controller('goods')
export class GoodsController {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  @Get()
  findAll() {
    return this.productRepository.find({
      relations: {
        months: true,
      },
      select: { id: true, name: true, months: { month: true, division: true } },
    });
  }

  @Get(':id')
  findOne(@Param() params) {
    const id = params.id;
    return this.productRepository.find({
      relations: {
        months: true,
      },
      select: {
        name: true,
        description: true,
        months: { month: true, division: true },
      },
      where: { id: id },
    });
  }
}
