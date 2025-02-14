import { Provider } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repository/user-repository.interface';
import { UserRepository } from 'src/infrastructure/repository/user.repository';
import { FindUserByIdUseCase } from 'src/usecases/user/find-user-by-id.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__FIND_USER_BY_ID_USE_CASE__');
const provider: Provider = {
  inject: [UserRepository],
  provide: token,
  useFactory: (repository: IUserRepository) =>
    new FindUserByIdUseCase(repository),
};

export const FindUserByIdProxy = new Proxy(token, provider);
