import {
  Exclude,
  Expose,
  Transform,
  TransformFnParams,
} from 'class-transformer';
import { UserModel } from 'src/domain/model/user.model';

export interface UserResult {
  user: UserPresenter;
}

@Exclude()
export class UserPresenter extends UserModel {
  @Expose()
  id: string;

  @Expose()
  firstname: string;

  @Expose()
  lastname: string;

  @Expose()
  email: string;

  @Expose()
  active: boolean;

  @Expose()
  @Transform(({ value }: TransformFnParams) => (value as Date).toISOString())
  createdAt: Date;

  @Expose()
  @Transform(({ value }: TransformFnParams) => (value as Date).toISOString())
  updatedAt: Date;
}
