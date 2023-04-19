import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsPhoneNumber,
  ValidateNested,
  IsNumber,
} from '@nestjs/class-validator';

import { Type } from '@nestjs/class-transformer';
@InputType()
export class addressInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  street: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  city: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  state: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  country: string;
}

@InputType()
export class createUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  password: string;

  @Field()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => addressInput)
  address: addressInput;

  @Field()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}
@InputType()
export class UserId {
  @Field({ nullable: false })
  @IsNumber()
  UserId: string;
}
