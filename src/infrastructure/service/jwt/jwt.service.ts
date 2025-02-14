import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/domain/auth/jwt/jwt-payload.interface';
import { IJwtService } from 'src/domain/auth/jwt/jwt.interface';

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  public async createToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
