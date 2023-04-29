import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { createUserInput, UserId } from './inputs/create-user.input';
import { User } from './types/user.type';
import {
  BadRequestException,
  NotFoundException,
  ServiceUnavailableException,
  UseGuards,
} from '@nestjs/common';
import { updateUserInput } from './inputs/update-user.input';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Resolver(() => User)
//User type defines the Returning value
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => [User])
  async getAllUsers(): Promise<any> {
    return this.userService.getAllUsers();
  }
  @UseGuards(JwtAuthGuard)
  @Query(() => User)
  async getUser(
    @Args('UserId', { type: () => String }) UserId: UserId,
  ): Promise<User | UserId> {
    const user = await this.userService.getUser(UserId);
    if (!user) {
      throw new NotFoundException(`User with ID ${UserId} does not exist`);
    }
    return user;
  }
  @Mutation(() => User)
  async createUser(
    @Args('createUserData') createUserData: createUserInput,
  ): Promise<any> {
    try {
      return this.userService.createUser(createUserData);
    } catch (error) {
      if (error.name === 'ValidationPipe' || error.name === 'ValidationError') {
        throw new BadRequestException(error.errors);
      }
      return new ServiceUnavailableException();
    }
  }
  @Mutation(() => User)
  async updateUser(
    @Args('updateUserData') updateUserData: updateUserInput,
    @Args('UserId', { type: () => String }) UserId: UserId,
  ): Promise<User | UserId> {
    return this.userService.updateUser(UserId, updateUserData);
  }
  @Mutation(() => String)
  async deleteUser(@Args('UserId') UserId: string): Promise<any> {
    const updatedOrder = this.userService.deleteUser(UserId);
    if (!updatedOrder) {
      throw new Error(`Order with OrderId ${UserId} not found`);
    }
    return updatedOrder;
  }
  @Mutation(() => User)
  async getUserByEmail(@Args('email') email: string): Promise<User> {
    return this.userService.getUserByEmail(email);
  }
}
