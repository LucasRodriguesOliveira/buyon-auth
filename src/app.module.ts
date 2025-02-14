import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { tokenConfig } from './infrastructure/config/token/token.config';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './infrastructure/config/env/env.config';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { ControllerModule } from './infrastructure/controller/controller.module';
import { UsecaseProxyModule } from './infrastructure/usecase-proxy/usecase-proxy.module';

@Module({
  imports: [
    JwtModule.registerAsync(tokenConfig()),
    ConfigModule.forRoot(envConfig),
    PrismaModule,
    ControllerModule,
    UsecaseProxyModule.register(),
  ],
})
export class AppModule {}
