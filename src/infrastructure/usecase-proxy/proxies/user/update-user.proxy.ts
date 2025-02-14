import { Provider } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repository/user-repository.interface';
import { UserRepository } from 'src/infrastructure/repository/user.repository';
import { UpdateUserUseCase } from 'src/usecases/user/update-user.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__UPDATE_USER_USE_CASE__');
const provider: Provider = {
  inject: [UserRepository],
  provide: token,
  useFactory: (repository: IUserRepository) =>
    new UpdateUserUseCase(repository),
};

export const UpdateUserProxy = new Proxy(token, provider);
