//it defines the Return type/fields
import { IsEmail } from '@nestjs/class-validator';
import { ObjectType } from '@nestjs/graphql';
import { Field } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
@ObjectType()
export class Address {
  @Field()
  @Prop({ required: true })
  street: string;
  @Field()
  @Prop({ required: true })
  city: string;
  @Field()
  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  @Field()
  country: string;
}

@ObjectType()
export class User {
  @Field()
  _id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true, unique: true })
  @IsEmail()
  email: string;

  @Field()
  @Prop({ required: true })
  password: string;

  @Field(() => Address)
  @Prop({ type: Address, required: true })
  address: Address;

  @Field()
  @Prop({ required: true })
  phone: string;
}
