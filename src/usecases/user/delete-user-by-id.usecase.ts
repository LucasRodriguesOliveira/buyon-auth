import { UserModel } from 'src/domain/model/user.model';
import { IUserRepository } from 'src/domain/repository/user-repository.interface';

export class DeleteUserByIdUseCase {
  constructor(private readonly repository: IUserRepository) {}

  public async run(userId: string): Promise<UserModel> {
    return this.repository.deleteById(userId);
  }
}
