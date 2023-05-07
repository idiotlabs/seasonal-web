import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('seasonal_state')
export class State {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  seasonal_state: string;

  @Column()
  seasonal_value: string;
}
