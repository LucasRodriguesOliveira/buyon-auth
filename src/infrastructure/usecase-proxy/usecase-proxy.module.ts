import { DynamicModule, Module } from '@nestjs/common';
import { AuthProxy } from './proxies/auth/auth.proxy';
import { RepositoryModule } from '../repository/repository.module';
import { BcryptModule } from '../service/bcrypt/bcrypt.module';
import { JwtTokenModule } from '../service/jwt/jwt.module';
import { UserProxies } from './proxies/user/user.proxy';

@Module({
  imports: [RepositoryModule, BcryptModule, JwtTokenModule],
})
export class UsecaseProxyModule {
  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [...AuthProxy.values(), ...UserProxies.values()],
      exports: [...AuthProxy.keys(), ...UserProxies.keys()],
    };
  }
}
