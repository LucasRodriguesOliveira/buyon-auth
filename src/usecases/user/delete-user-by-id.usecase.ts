import { UserModel } from 'src/domain/model/user.model';
import { IUserRepository } from 'src/domain/repository/user-repository.interface';
import { ErrorCode } from 'src/domain/types/error-code.enum';
import { ErrorResponse } from 'src/domain/types/error.interface';
import { Result } from 'src/domain/types/result';

export class DeleteUserByIdUseCase {
  constructor(private readonly repository: IUserRepository) {}

  public async run(userId: string): Promise<Result<UserModel, ErrorResponse>> {
    try {
      const userDeleted = await this.repository.deleteById(userId);

      return {
        value: userDeleted,
      };
    } catch (err) {
      console.log('Erro ao excluir usuário');
      console.log('parâmetros', { userId });
      console.log(err);

      return {
        error: {
          code: ErrorCode.UNEXPECTED,
          message: 'b_auth:[delete-user-by-id.usecase]',
        },
      };
    }
  }
}
