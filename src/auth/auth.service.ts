import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  async validateBearerToken(token: string): Promise<any> {
    return token === this.configService.get<string>('BEARER_TOKEN');
  }
}
