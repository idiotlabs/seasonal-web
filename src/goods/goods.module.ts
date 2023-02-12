import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [GoodsController],
  providers: [GoodsService, AuthService],
  exports: [AuthService],
})
export class GoodsModule {}
