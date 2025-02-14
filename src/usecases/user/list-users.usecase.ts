import { UserModel } from 'src/domain/model/user.model';
import { IUserRepository } from 'src/domain/repository/user-repository.interface';

export class ListUsersUseCase {
  constructor(private readonly repository: IUserRepository) {}

  public async run(): Promise<UserModel[]> {
    return this.repository.findAll();
  }
}
