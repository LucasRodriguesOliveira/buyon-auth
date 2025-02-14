import { Provider } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repository/user-repository.interface';
import { UserRepository } from 'src/infrastructure/repository/user.repository';
import { DeleteUserByIdUseCase } from 'src/usecases/user/delete-user-by-id.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__DELETE_USER_BY_ID_USE_CASE__');
const provider: Provider = {
  inject: [UserRepository],
  provide: token,
  useFactory: (repository: IUserRepository) =>
    new DeleteUserByIdUseCase(repository),
};

export const DeleteUserByIdProxy = new Proxy(token, provider);
