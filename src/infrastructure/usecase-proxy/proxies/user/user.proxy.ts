import { Provider } from '@nestjs/common';
import { CreateUserProxy } from './create-user.proxy';
import { FindUserByIdProxy } from './find-user-by-id.proxy';
import { ListUsersProxy } from './list-users.proxy';
import { UpdateUserProxy } from './update-user.proxy';
import { DeleteUserByIdProxy } from './delete-user-by-id.proxy';

export const UserProxies: Map<symbol, Provider> = new Map([
  CreateUserProxy.Entry,
  FindUserByIdProxy.Entry,
  ListUsersProxy.Entry,
  UpdateUserProxy.Entry,
  DeleteUserByIdProxy.Entry,
]);
