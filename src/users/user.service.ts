import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER_MODEL, User } from 'src/schemas/user.schema';
import { createUserInput, UserId } from './inputs/create-user.input';
import { updateUserInput } from './inputs/update-user.input';
import { Args } from '@nestjs/graphql';
import { nanoid } from 'nanoid';
import { UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {
  //Model<Type>  here type is the User Document type
  constructor(
    @InjectModel(USER_MODEL) private userModel: Model<UserDocument>,
  ) {}
  async createUser(createUserData: createUserInput): Promise<User> {
    console.log(
      '🚀 ~ file: user.service.ts:17 ~ UserService ~ userModel:',
      this.userModel,
    );
    const UserId = nanoid(15);
    const createdUser = new this.userModel({
      ...createUserData,
      UserId: UserId,
    });
    return createdUser.save();
  }
  async getUser(UserId: UserId): Promise<User> {
    console.log(
      '🚀 ~ file: user.service.ts:30 ~ UserService ~ getUser ~ UserId:',
      UserId,
    );
    return this.userModel.findOne({ UserId }).exec();
  }
  async updateUser(
    @Args('UserId', { type: () => String }) UserId: UserId,
    @Args('updateUserData') updateUserData: updateUserInput,
  ): Promise<User> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { UserId },
      { $set: updateUserData },
      { new: true },
    );
    if (!updatedUser) {
      throw new NotFoundException(`User with UserId ${UserId} not found`);
    }
    return updatedUser;
  }
  async deleteUser(UserId: string): Promise<any> {
    const result = await this.userModel.deleteOne({ UserId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`User with ID ${UserId} not found`);
    }
    return 'User deleted successfully';
  }
  async getAllUsers(): Promise<any> {
    return await this.userModel.find();
  }
}
