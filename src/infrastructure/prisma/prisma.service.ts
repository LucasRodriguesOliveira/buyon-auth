import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { APP_TOKEN } from 'src/infrastructure/config/env/app.config';
import { AppConfig } from 'src/infrastructure/config/types/app.interface';
import { EnvMode } from 'src/infrastructure/config/types/mode.enum';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {
    super({
      log:
        configService.getOrThrow<AppConfig>(APP_TOKEN.description).mode ===
        EnvMode.DEVELOPMENT
          ? ['query', 'error']
          : ['error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
