import { Controller, Inject } from '@nestjs/common';
import { LoginProxy } from 'src/infrastructure/usecase-proxy/proxies/auth/login-usecase.proxy';
import { LoginUseCase } from 'src/usecases/auth/login.usecase';
import { GrpcMethod } from '@nestjs/microservices';
import { GRPCService } from 'src/infrastructure/grpc/service.enum';
import { LoginResponse } from './presenter/login.presenter';
import { LoginRequest } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RegisterPresenter } from './presenter/register.presenter';
import { CreateUserProxy } from 'src/infrastructure/usecase-proxy/proxies/user/create-user.proxy';
import { CreateUserUseCase } from 'src/usecases/user/create-user.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(LoginProxy.Token)
    private readonly loginUseCase: LoginUseCase,
    @Inject(CreateUserProxy.Token)
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @GrpcMethod(GRPCService.AUTH)
  public async login({
    email,
    password,
  }: LoginRequest): Promise<LoginResponse> {
    const user = await this.loginUseCase.validateUser(email, password);

    return {
      token: await this.loginUseCase.login(user),
    };
  }

  @GrpcMethod(GRPCService.AUTH)
  public async register(registerDto: RegisterDto): Promise<RegisterPresenter> {
    const user = await this.createUserUseCase.run(registerDto);
    const token = await this.loginUseCase.login(user);

    return {
      token,
    };
  }
}
