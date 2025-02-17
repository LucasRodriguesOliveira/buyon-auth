import { UserModel } from 'src/domain/model/user.model';

export interface ListUserPresenter {
  users: UserModel[];
}
