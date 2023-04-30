import { IsEmail } from '@nestjs/class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @IsEmail()
  @Field()
  email: string;

  @Field()
  password: string;
}
