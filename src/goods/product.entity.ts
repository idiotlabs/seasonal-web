import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Month } from './month.entity';

@Entity('seasonal_products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @OneToMany(() => Month, (month) => month.product)
  months: Month[];
}
