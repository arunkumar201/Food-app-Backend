import { User } from './../users/types/user.type';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './../users/user.service';
import * as bcrypt from 'bcrypt';
import { LoginInput } from './inputs/login.input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async ValidateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.getUserByEmail(email);
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (user && passwordMatch) {
      if (passwordMatch) {
        return user;
      }
    }
    return null;
  }

  async login(loginUserInput: LoginInput): Promise<any> {
    const user = await this.userService.getUserByEmail(loginUserInput.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.password };
    const access_token = this.jwtService.sign(payload);
    return { access_token: access_token, userDetails: user };
  }
}
