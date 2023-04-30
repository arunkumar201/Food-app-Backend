import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER_MODEL, User } from 'src/schemas/user.schema';
import { createUserInput, UserId } from './inputs/create-user.input';
import { updateUserInput } from './inputs/update-user.input';
import { nanoid } from 'nanoid';
import { UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { Args } from '@nestjs/graphql';
@Injectable()
export class UserService {
  //Model<Type>  here type is the User Document type
  constructor(
    @InjectModel(USER_MODEL) private userModel: Model<UserDocument>,
  ) {}
  async createUser(createUserData: createUserInput): Promise<any> {
    const emailExists = await this.userModel.exists({
      email: createUserData.email,
    });
    if (emailExists) {
      throw new Error('Email already exists');
    }

    const phoneExists = await this.userModel.exists({
      phone: createUserData.phone,
    });
    if (phoneExists) {
      throw new Error('Phone number already exists');
    }
    const userId = nanoid(20);

    const hashedPassword = await bcrypt.hash(createUserData.password, 15);
    const createdUser = await new this.userModel({
      ...createUserData,
      UserId: userId,
      password: hashedPassword,
    });

    return createdUser.save();
  }

  async getUser(UserId: UserId): Promise<User> {
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
  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }
}
