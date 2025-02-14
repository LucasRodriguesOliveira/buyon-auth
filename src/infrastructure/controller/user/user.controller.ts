import { Controller, Inject } from '@nestjs/common';
import { CreateUserProxy } from 'src/infrastructure/usecase-proxy/proxies/user/create-user.proxy';
import { CreateUserUseCase } from 'src/usecases/user/create-user.usecase';
import { UserModel } from 'src/domain/model/user.model';
import { ListUsersProxy } from 'src/infrastructure/usecase-proxy/proxies/user/list-users.proxy';
import { ListUsersUseCase } from 'src/usecases/user/list-users.usecase';
import { FindUserByIdProxy } from 'src/infrastructure/usecase-proxy/proxies/user/find-user-by-id.proxy';
import { FindUserByIdUseCase } from 'src/usecases/user/find-user-by-id.usecase';
import { UpdateUserProxy } from 'src/infrastructure/usecase-proxy/proxies/user/update-user.proxy';
import { UpdateUserUseCase } from 'src/usecases/user/update-user.usecase';
import { DeleteUserByIdProxy } from 'src/infrastructure/usecase-proxy/proxies/user/delete-user-by-id.proxy';
import { DeleteUserByIdUseCase } from 'src/usecases/user/delete-user-by-id.usecase';
import { GrpcMethod } from '@nestjs/microservices';
import { GRPCService } from 'src/infrastructure/grpc/service.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserPresenter } from './presenter/list-user.presenter';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserById } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { plainToInstance } from 'class-transformer';
import { UserPresenter } from './presenter/user.presenter';

@Controller('user')
export class UserController {
  constructor(
    @Inject(CreateUserProxy.Token)
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject(ListUsersProxy.Token)
    private readonly listUsersUseCase: ListUsersUseCase,
    @Inject(FindUserByIdProxy.Token)
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    @Inject(UpdateUserProxy.Token)
    private readonly updateUserUseCase: UpdateUserUseCase,
    @Inject(DeleteUserByIdProxy.Token)
    private readonly deleteUserByIdUseCase: DeleteUserByIdUseCase,
  ) {}

  @GrpcMethod(GRPCService.USER)
  public async create(createUserDto: CreateUserDto): Promise<UserModel> {
    const user = await this.createUserUseCase.run(createUserDto);

    return plainToInstance(UserPresenter, user);
  }

  @GrpcMethod(GRPCService.USER)
  public async list(): Promise<ListUserPresenter> {
    const users = await this.listUsersUseCase.run();

    return {
      users: plainToInstance(UserPresenter, users),
    };
  }

  @GrpcMethod(GRPCService.USER)
  public async findById({ id }: FindUserDto): Promise<UserModel> {
    const user = await this.findUserByIdUseCase.run(id);

    return plainToInstance(UserPresenter, user);
  }

  @GrpcMethod(GRPCService.USER)
  public async update({ id, userData }: UpdateUserById): Promise<UserModel> {
    const user = await this.updateUserUseCase.run(id, userData);

    return plainToInstance(UserPresenter, user);
  }

  @GrpcMethod(GRPCService.USER)
  public async delete({ id }: DeleteUserDto): Promise<UserModel> {
    const user = await this.deleteUserByIdUseCase.run(id);

    return plainToInstance(UserPresenter, user);
  }
}
