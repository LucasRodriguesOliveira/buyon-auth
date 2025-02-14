import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ICryptoService } from 'src/domain/auth/crypto/crypto.interface';
import { APP_TOKEN } from '../../config/env/app.config';
import { AppConfig } from '../../config/types/app.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService implements ICryptoService {
  constructor(private readonly config: ConfigService) {}

  public async hash(original: string): Promise<string> {
    const {
      user: {
        password: { saltRounds },
      },
    } = this.config.get<AppConfig>(APP_TOKEN.description);

    return await bcrypt.hash(original, saltRounds);
  }

  public async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
