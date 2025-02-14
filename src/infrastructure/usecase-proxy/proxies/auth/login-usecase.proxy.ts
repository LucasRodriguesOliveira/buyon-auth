import { Provider } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repository/user-repository.interface';
import { UserRepository } from 'src/infrastructure/repository/user.repository';
import { LoginUseCase } from 'src/usecases/auth/login.usecase';
import { Proxy } from '../../proxy';
import { BcryptService } from 'src/infrastructure/service/bcrypt/bcrypt.service';
import { JwtTokenService } from 'src/infrastructure/service/jwt/jwt.service';
import { ICryptoService } from 'src/domain/auth/crypto/crypto.interface';
import { IJwtService } from 'src/domain/auth/jwt/jwt.interface';

const token = Symbol('__LOGIN_USE_CASE_PROXY__');
const provider: Provider = {
  inject: [UserRepository, BcryptService, JwtTokenService],
  provide: token,
  useFactory: (
    userRepository: IUserRepository,
    bcryptService: ICryptoService,
    jwtService: IJwtService,
  ) => new LoginUseCase(userRepository, bcryptService, jwtService),
};

export const LoginProxy = new Proxy(token, provider);
