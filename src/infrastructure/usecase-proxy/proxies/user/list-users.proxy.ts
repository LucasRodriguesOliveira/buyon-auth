import { Provider } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repository/user-repository.interface';
import { UserRepository } from 'src/infrastructure/repository/user.repository';
import { ListUsersUseCase } from 'src/usecases/user/list-users.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__LIST_USERS_USE_CASE__');
const provider: Provider = {
  inject: [UserRepository],
  provide: token,
  useFactory: (repository: IUserRepository) => new ListUsersUseCase(repository),
};

export const ListUsersProxy = new Proxy(token, provider);
