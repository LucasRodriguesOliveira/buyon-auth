import { ICryptoService } from 'src/domain/auth/crypto/crypto.interface';
import { JwtPayload } from 'src/domain/auth/jwt/jwt-payload.interface';
import { IJwtService } from 'src/domain/auth/jwt/jwt.interface';
import { UserModel } from 'src/domain/model/user.model';
import { IUserRepository } from 'src/domain/repository/user-repository.interface';

export class LoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly cryptoService: ICryptoService,
    private readonly jwtService: IJwtService,
  ) {}

  public async validateUser(
    email: string,
    password: string,
  ): Promise<UserModel | null> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      console.log('no user found');
      return null;
    }

    const match = await this.cryptoService.compare(password, user.password);

    if (!match) {
      console.log("password doesn't match");
      return null;
    }

    return user;
  }

  public async validateUserJwt(email: string): Promise<UserModel> {
    return this.userRepository.findByEmail(email);
  }

  public async login({ id, email }: UserModel): Promise<string> {
    const payload: JwtPayload = {
      sub: id,
      email,
    };

    return this.jwtService.createToken(payload);
  }
}
