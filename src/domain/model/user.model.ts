export class UserModel {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
