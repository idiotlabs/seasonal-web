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
      where: { display: 1 },
    });

    // month만 배열로 새로 만들고 싶어서 정리
    for (const list of await lists) {
      list['month_list'] = list['months'].map((value) => value.month);
    }

    // 배열 정렬
    let currentMonth = new Date().getMonth() + 1;

    let originLists = [];
    const newLists = [];

    originLists = await lists;
    console.log(originLists.length);

    // 리스트에 현재 달이 포함된 값만 빼서 정렬하는 새 리스트를 만든다.
    while (originLists.length > 0) {
      const subList = [];

      // 현재 달이 포함된 값을 subList에 저장하고 기존 리스트에서는 제거
      for (let i = 0; i < originLists.length; i++) {
        if (originLists[i].month_list.includes(currentMonth)) {
          subList.push(originLists[i]);
          originLists.splice(i, 1);
          i--;
        }
      }

      // 정렬하여 push
      newLists.push(
        ...subList.sort((a, b) => {
          const indexA = a.month_list.indexOf(currentMonth);
          const indexB = b.month_list.indexOf(currentMonth);

          if (indexA > -1 && indexB > -1 && indexA != indexB) {
            return indexB - indexA;
          } else if (a.month_list.length != b.month_list.length) {
            return a.month_list.length - b.month_list.length;
          } else {
            if (a.month_list.length != b.month_list.length) {
              return b.month_list.length - a.month_list.length;
            } else {
              return 0;
            }
          }
        }),
      );

      currentMonth += 1;
      if (currentMonth > 12) currentMonth -= 12;
    }

    return newLists;
  }

  // id에 해당하는 상품 가져오기
  async findOne(id) {
    return this.productRepository.findOne({
      relations: {
        months: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        months: { month: true, division: true },
      },
      where: { id: id },
    });
  }
}
