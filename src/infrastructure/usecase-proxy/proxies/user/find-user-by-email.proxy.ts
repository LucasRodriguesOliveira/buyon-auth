import { Provider } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repository/user-repository.interface';
import { UserRepository } from 'src/infrastructure/repository/user.repository';
import { FindUserByEmailUseCase } from 'src/usecases/user/find-user-by-email.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__FIND_USER_BY_EMAIL_USE_CASE__');
const provider: Provider = {
  provide: token,
  inject: [UserRepository],
  useFactory: (repository: IUserRepository) =>
    new FindUserByEmailUseCase(repository),
};

export const FindUserByEmailProxy = new Proxy(token, provider);
