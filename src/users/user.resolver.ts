import { Resolver, Mutation, Args, Int, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { createUserInput, UserId } from './inputs/create-user.input';
import { User } from './types/user.type';
import { NotFoundException } from '@nestjs/common';
import { updateUserInput } from './inputs/updateUserInput .input';
@Resolver(() => User)
//User type defines the Returning value
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => [User])
  async getAllUsers(): Promise<any> {
    return this.userService.getAllUsers();
  }
  @Query(() => User)
  async getUser(
    @Args('UserId', { type: () => Int }) UserId: UserId,
  ): Promise<User | UserId> {
    const user = await this.userService.getUser(UserId);
    if (!user) {
      throw new NotFoundException(`User with ID ${UserId} does not exist`);
    }
    return user.toObject();
  }
  @Mutation(() => User)
  async createUser(
    @Args('createUserData') createUserData: createUserInput,
  ): Promise<any> {
    return this.userService.createUser(createUserData);
  }
  @Mutation(() => User)
  async updateUser(
    @Args('updateUserData') updateUserData: updateUserInput,
    @Args('UserId', { type: () => Int }) UserId: UserId,
  ): Promise<User | UserId> {
    return this.userService.updateUser(UserId, updateUserData);
  }
  @Mutation(() => Boolean)
  async deleteUser(@Args('UserId') UserId: number): Promise<boolean> {
    return this.userService.deleteUser(UserId);
  }
}
