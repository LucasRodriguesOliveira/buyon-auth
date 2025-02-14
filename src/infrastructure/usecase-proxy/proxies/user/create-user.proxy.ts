import { Provider } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repository/user-repository.interface';
import { UserRepository } from 'src/infrastructure/repository/user.repository';
import { CreateUserUseCase } from 'src/usecases/user/create-user.usecase';
import { Proxy } from '../../proxy';
import { BcryptService } from 'src/infrastructure/service/bcrypt/bcrypt.service';
import { ICryptoService } from 'src/domain/auth/crypto/crypto.interface';

const token = Symbol('__CREATE_USER_USE_CASE__');
const provider: Provider = {
  inject: [UserRepository, BcryptService],
  provide: token,
  useFactory: (repository: IUserRepository, cryptoService: ICryptoService) =>
    new CreateUserUseCase(repository, cryptoService),
};

export const CreateUserProxy = new Proxy(token, provider);
