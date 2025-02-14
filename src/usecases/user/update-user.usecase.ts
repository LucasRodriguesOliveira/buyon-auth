import { UserModel } from 'src/domain/model/user.model';
import { IUserRepository } from 'src/domain/repository/user-repository.interface';

export class UpdateUserUseCase {
  constructor(private readonly repository: IUserRepository) {}

  public async run(
    userId: string,
    user: Partial<UserModel>,
  ): Promise<UserModel> {
    return this.repository.update(userId, user);
  }
}
