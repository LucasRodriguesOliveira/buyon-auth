import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repository/user-repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { UserModel } from 'src/domain/model/user.model';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async insert(user: UserModel): Promise<UserModel> {
    return this.prisma.user.create({
      data: user,
    });
  }

  public async findAll(): Promise<UserModel[]> {
    return this.prisma.user.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  public async findById(userId: string): Promise<UserModel> {
    return this.prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
  }

  public async findByEmail(email: string): Promise<UserModel | null> {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  public async update(
    userId: string,
    userToUpdate: Partial<UserModel>,
  ): Promise<UserModel> {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: userToUpdate,
    });
  }

  public async deleteById(userId: string): Promise<UserModel> {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
