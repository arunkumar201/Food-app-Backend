import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { createUserInput, UserId } from './inputs/create-user.input';
import { updateUserInput } from './inputs/updateUserInput .input';
import { Args, Int } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService,
  ) {}
  async createUser(createUserData: createUserInput): Promise<User> {
    console.log('DATABASE_URL', this.configService.get<string>('DATABASE_URL'));
    const latestUser = await this.userModel
      .findOne()
      .sort({ UserId: -1 })
      .exec();

    const newUserId = latestUser ? latestUser.UserId + 1 : 1;
    const createdUser = new this.userModel({
      ...createUserData,
      UserId: newUserId,
    });
    return createdUser.save();
  }
  async getUser(UserId: UserId): Promise<User> {
    return this.userModel.findOne({ UserId }).exec();
  }
  async updateUser(
    @Args('UserId', { type: () => Int }) UserId: UserId,
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
  async deleteUser(UserId: number): Promise<boolean> {
    const result = await this.userModel.deleteOne({ UserId }).exec();
    return result.acknowledged;
  }
  async getAllUsers(): Promise<any> {
    return await this.userModel.find();
  }
}
