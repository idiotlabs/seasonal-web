import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsModule } from './goods/goods.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'idiotlabs.cp2wvuonihfg.ap-northeast-2.rds.amazonaws.com',
      port: 3306,
      username: 'idiotlabs',
      password: 'idiotlabs4444',
      database: 'idiotlabs',
      entities: [__dirname + '/**/**/*.entity.{ts,js}'],
      synchronize: false,
    }),
    GoodsModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
