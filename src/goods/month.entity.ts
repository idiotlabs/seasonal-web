import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('seasonal_months')
export class Month {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @Column()
  month: number;

  @Column()
  division: number;

  @ManyToOne(() => Product, (product) => product.months)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
