import { UserModel } from '../model/user.model';

export interface IUserRepository {
  insert(user: Partial<UserModel>): Promise<UserModel>;
  findAll(): Promise<UserModel[]>;
  findById(userId: string): Promise<UserModel>;
  findByEmail(email: string): Promise<UserModel>;
  update(userId: string, userToUpdate: Partial<UserModel>): Promise<UserModel>;
  deleteById(userId: string): Promise<UserModel>;
}
