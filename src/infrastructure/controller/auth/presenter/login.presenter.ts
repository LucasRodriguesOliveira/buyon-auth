import { UserModel } from 'src/domain/model/user.model';

export interface LoginResult {
  user: UserModel;
  token: string;
}
