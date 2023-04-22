import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail, IsPhoneNumber } from '@nestjs/class-validator';
import { Types } from 'mongoose';
import mongoose from 'mongoose';
@ObjectType()
@Schema()
export class Address {
  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  country: string;
}
@ObjectType()
@Schema({
  collection: 'user',
  timestamps: true,
})
export class User {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }] })
  orders: string | Types.ObjectId;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, unique: true })
  UserId: string;
  @Prop({ required: true, unique: true })
  @IsEmail()
  email: string;
  @Prop({ required: true, unique: true })
  @IsPhoneNumber()
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Address })
  address: Address;

  @Prop({ default: Date.now })
  createdAt: Date;
}
//Create the User Document type
//UserDocument=it holds User Properties as well as the Document Properties/methods
//like find,delete,update,findById and so on in mongodb
export type UserDocument = User & Document;

//it returns the UserSchema and compiles it
export const UserSchema = SchemaFactory.createForClass(User);
//Schema Name
export const USER_MODEL = User.name;
