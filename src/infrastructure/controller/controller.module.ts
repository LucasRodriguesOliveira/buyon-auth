import { Module } from '@nestjs/common';
import { UsecaseProxyModule } from '../usecase-proxy/usecase-proxy.module';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [UsecaseProxyModule.register()],
  controllers: [AuthController, UserController],
})
export class ControllerModule {}
