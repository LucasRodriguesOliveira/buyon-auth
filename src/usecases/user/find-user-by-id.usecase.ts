import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserModel } from 'src/domain/model/user.model';
import { IUserRepository } from 'src/domain/repository/user-repository.interface';
import { ErrorCode } from 'src/domain/types/error-code.enum';
import { ErrorResponse } from 'src/domain/types/error.interface';
import { Result } from 'src/domain/types/result';
import { PrismaClientKnownError } from 'src/infrastructure/prisma/prisma-errors.enum';

export class FindUserByIdUseCase {
  constructor(private readonly repository: IUserRepository) {}

  public async run(userId: string): Promise<Result<UserModel, ErrorResponse>> {
    let user: UserModel;

    try {
      user = await this.repository.findById(userId);
    } catch (err) {
      const { code } = err as PrismaClientKnownRequestError;

      if (code === PrismaClientKnownError.NOT_FOUND) {
        return {
          error: {
            code: ErrorCode.USER_NOT_FOUND,
            message: 'User not found',
          },
        };
      }

      return {
        error: {
          code: ErrorCode.UNEXPECTED,
          message: 'An unexpected error occurred',
        },
      };
    }

    return {
      value: user,
    };
  }
}
