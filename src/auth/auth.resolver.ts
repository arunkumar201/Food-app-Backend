import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginResponse } from './login.response';
import { LoginInput } from './inputs/login.input';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { User } from 'src/schemas/user.schema';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(@Args('loginInput') loginUserInput: LoginInput): Promise<any> {
    return this.authService.login(loginUserInput);
  }
}
