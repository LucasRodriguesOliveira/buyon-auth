import { UserModel } from 'src/domain/model/user.model';
import { IUserRepository } from 'src/domain/repository/user-repository.interface';
import { ErrorCode } from 'src/domain/types/error-code.enum';
import { ErrorResponse } from 'src/domain/types/error.interface';
import { Result } from 'src/domain/types/result';

export class ListUsersUseCase {
  constructor(private readonly repository: IUserRepository) {}

  public async run(): Promise<Result<UserModel[], ErrorResponse>> {
    try {
      const users = await this.repository.findAll();
      return {
        value: users,
      };
    } catch (err) {
      console.log('Erro ao listar usuários');
      console.log('Parâmetros', {});
      console.log(err);

      return {
        error: {
          code: ErrorCode.UNEXPECTED,
          message: 'b_auth:[list-users.usecase]',
        },
      };
    }
  }
}
