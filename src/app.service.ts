import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from './entity/state.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(State) private stateRepository: Repository<State>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getVersion() {
    const state = await this.stateRepository
      .createQueryBuilder('state')
      .where('seasonal_state = :state', { state: 'api_version' })
      .getOne();

    return { data: state.seasonal_value };
  }
}
