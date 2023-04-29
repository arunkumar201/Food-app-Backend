import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './../users/user.service';
import { User } from 'src/schemas/user.schema';
// import * as bcrypt from 'bcrypt';
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
    if (user.password === password) {
      return user;
    }
    return null;
  }
  //   async ValidateUser1(email: string, password: string): Promise<User | null> {
  //     const user = await this.userService.getUserByEmail(email);
  //     if (user) {
  //       const passwordMatch = await bcrypt.compare(password, user.password);
  //       if (passwordMatch) {
  //         return user;
  //       }
  //     }
  //     return null;
  //   }

  async login(loginUserInput: LoginInput): Promise<any> {
    const user = await this.userService.getUserByEmail(loginUserInput.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { password, ...result } = user;
    console.log(
      '🚀 ~ file: auth.service.ts:39 ~ AuthService ~ login ~ result:',
      user.address,
    );
    const payload = { email: user.email, sub: user.password };
    const access_token = this.jwtService.sign(payload);
    return { access_token: access_token, userDetails: user };
  }
}

// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UserService } from '../users/user.service';
// import { LoginInput } from './login.input';

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly userService: UserService,
//     private readonly jwtService: JwtService,
//   ) {}

//   async login(loginUserInput: LoginInput): Promise<{ access_token: string }> {
//     const user = await this.userService.validateUser(
//       loginUserInput.email,
//       loginUserInput.password,
//     );

//     if (!user) {
//       throw new UnauthorizedException('Invalid credentials');
//     }

//     const payload = { email: user.email, sub: user._id };
//     const access_token = this.jwtService.sign(payload);

//     return { access_token };
//   }
// console.log(
//   '🚀 ~ file: auth.service.ts:78 ~ AuthService ~ //login ~ password:',
//   password,
// );
// }
