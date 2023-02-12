import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  // 전체 상품 가져오기
  async findAll() {
    const lists = this.productRepository.find({
      relations: {
        months: true,
      },
      select: {
        id: true,
        name: true,
        image: true,
        months: { month: true, division: true },
      },
    });

    // month만 배열로 새로 만들고 싶어서 정리
    for (const list of await lists) {
      list['month_list'] = list['months'].map((value) => value.month);
    }

    return lists;
  }

  // id에 해당하는 상품 가져오기
  async findOne(id) {
    return this.productRepository.find({
      relations: {
        months: true,
      },
      select: {
        name: true,
        description: true,
        image: true,
        months: { month: true, division: true },
      },
      where: { id: id },
    });
  }
}
