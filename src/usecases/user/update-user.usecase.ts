import { UserModel } from 'src/domain/model/user.model';
import { IUserRepository } from 'src/domain/repository/user-repository.interface';
import { ErrorCode } from 'src/domain/types/error-code.enum';
import { ErrorResponse } from 'src/domain/types/error.interface';
import { Result } from 'src/domain/types/result';

export class UpdateUserUseCase {
  constructor(private readonly repository: IUserRepository) {}

  public async run(
    userId: string,
    user: Partial<UserModel>,
  ): Promise<Result<UserModel, ErrorResponse>> {
    try {
      const userUpdated = await this.repository.update(userId, user);

      return {
        value: userUpdated,
      };
    } catch (err) {
      console.log('Erro ao atualizar usuário');
      console.log('parâmetros', { userId, user });
      console.log(err);

      return {
        error: {
          code: ErrorCode.UNEXPECTED,
          message: 'b_auth:[update-user.usecase]',
        },
      };
    }
  }
}
