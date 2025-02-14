import { UserModel } from 'src/domain/model/user.model';
import { IUserRepository } from '../../domain/repository/user-repository.interface';
import { ICryptoService } from 'src/domain/auth/crypto/crypto.interface';

export class CreateUserUseCase {
  constructor(
    private readonly repository: IUserRepository,
    private readonly cryptoService: ICryptoService,
  ) {}

  public async run(user: Partial<UserModel>): Promise<UserModel> {
    const hashPassword = await this.cryptoService.hash(user.password);
    return this.repository.insert({
      ...user,
      password: hashPassword,
    });
  }
}
