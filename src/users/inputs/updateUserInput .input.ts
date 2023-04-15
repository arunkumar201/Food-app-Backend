import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsPhoneNumber,
  ValidateNested,
  IsOptional,
  IsEmail,
} from '@nestjs/class-validator';
import { Type } from '@nestjs/class-transformer';
import { addressInput } from './create-user.input';
@InputType()
export class updateUserInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  password?: string;

  @Field(() => addressInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => addressInput)
  address?: addressInput;

  @Field({ nullable: true })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
}
