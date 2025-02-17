import { ICryptoService } from 'src/domain/auth/crypto/crypto.interface';
import { JwtPayload } from 'src/domain/auth/jwt/jwt-payload.interface';
import { IJwtService } from 'src/domain/auth/jwt/jwt.interface';
import { UserModel } from 'src/domain/model/user.model';
import { IUserRepository } from 'src/domain/repository/user-repository.interface';
import { Result } from 'src/domain/types/result';
import { ErrorCode } from 'src/domain/types/error-code.enum';
import { ErrorResponse } from 'src/domain/types/error.interface';

export class LoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly cryptoService: ICryptoService,
    private readonly jwtService: IJwtService,
  ) {}

  public async checkUser(
    email: string,
    password: string,
  ): Promise<Result<UserModel, ErrorResponse>> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return {
        error: {
          code: ErrorCode.USER_NOT_FOUND,
          message: 'No user found',
        },
      };
    }

    const match = await this.cryptoService.compare(password, user.password);

    if (!match) {
      return {
        error: {
          code: ErrorCode.WRONG_PASSWORD,
          message: "Password doesn't match",
        },
      };
    }

    return {
      value: user,
    };
  }

  public async login({ id, email }: UserModel): Promise<string> {
    const payload: JwtPayload = {
      sub: id,
      email,
    };

    return this.jwtService.createToken(payload);
  }
}
