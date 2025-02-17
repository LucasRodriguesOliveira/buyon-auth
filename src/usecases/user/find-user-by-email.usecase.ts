import { UserModel } from 'src/domain/model/user.model';
import { IUserRepository } from 'src/domain/repository/user-repository.interface';
import { ErrorCode } from 'src/domain/types/error-code.enum';
import { ErrorResponse } from 'src/domain/types/error.interface';
import { Result } from 'src/domain/types/result';

export class FindUserByEmailUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async run(email: string): Promise<Result<UserModel, ErrorResponse>> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return {
        error: {
          code: ErrorCode.USER_NOT_FOUND,
          message: 'User not found',
        },
      };
    }

    return {
      value: user,
    };
  }
}
