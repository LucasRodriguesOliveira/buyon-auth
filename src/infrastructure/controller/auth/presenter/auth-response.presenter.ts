import { UserModel } from 'src/domain/model/user.model';
import { ErrorResponse } from 'src/domain/types/error.interface';
import { Result } from 'src/domain/types/result';

export interface AuthResult {
  user: UserModel;
  token: string;
}

export interface AuthResponse extends Result<AuthResult, ErrorResponse> {
  value?: AuthResult;
  error?: ErrorResponse;
}
