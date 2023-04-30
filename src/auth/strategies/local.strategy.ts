import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // Call the parent constructor with options
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    // Validate the user credentials
    const user = await this.authService.ValidateUser(email, password);

    // If credentials are valid, return the user object
    if (user) {
      return user;
    }
    // If credentials are invalid, throw an unauthorized exception
    throw new UnauthorizedException();
  }
}
