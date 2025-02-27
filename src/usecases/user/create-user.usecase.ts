import { UserModel } from 'src/domain/model/user.model';
import { IUserRepository } from '../../domain/repository/user-repository.interface';
import { ICryptoService } from 'src/domain/auth/crypto/crypto.interface';
import { ErrorResponse } from 'src/domain/types/error.interface';
import { Result } from 'src/domain/types/result';
// import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ErrorCode } from 'src/domain/types/error-code.enum';

export class CreateUserUseCase {
  constructor(
    private readonly repository: IUserRepository,
    private readonly cryptoService: ICryptoService,
  ) {}

  public async run(
    user: Partial<UserModel>,
  ): Promise<Result<UserModel, ErrorResponse>> {
    const hashPassword = await this.cryptoService.hash(user.password);
    try {
      const userCreated = await this.repository.insert({
        ...user,
        password: hashPassword,
      });

      return {
        value: userCreated,
      };
    } catch (err) {
      console.log('Erro ao criar usuário');
      console.log('Parâmetros', { user });
      console.log(err);

      return {
        error: {
          code: ErrorCode.UNEXPECTED,
          message: 'b_auth:[create-user.usecase]',
        },
      };
    }
  }
}
