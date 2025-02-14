import {
  Exclude,
  Expose,
  Transform,
  TransformFnParams,
} from 'class-transformer';
import { UserModel } from 'src/domain/model/user.model';

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
  @Transform(({ value }: TransformFnParams) => {
    return {
      seconds: (value as Date).getTime() / 1000,
      nanos: 0,
    };
  })
  createdAt: Date;

  @Expose()
  @Transform(({ value }: TransformFnParams) => {
    return {
      seconds: (value as Date).getTime() / 1000,
      nanos: 0,
    };
  })
  updatedAt: Date;
}
