import { IsOptional, IsPhoneNumber } from '@nestjs/class-validator';
import { InputType, Field, Float, Int } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsNumber,
  IsPositive,
} from 'class-validator';

@InputType()
class MenuInput {
  @Field(() => String)
  name: string;

  @Field()
  @IsString()
  description: string;

  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  price: number;

  @Field(() => String)
  @IsString()
  image: string;
}

@InputType()
export class CreateRestaurantInput {
  @Field(() => String)
  ownerName: string;

  @Field()
  @IsPhoneNumber()
  phone: string;

  @Field(() => [String]) // Add type to categories field
  categories: string[];

  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsString()
  description: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  address: string;

  @Field(() => Number, { nullable: true })
  @IsInt()
  cityId?: number;

  @Field(() => String)
  @IsOptional()
  lat?: string;

  @Field(() => String)
  @IsOptional()
  lng?: string;

  @Field(() => String)
  coverImage: string;

  @Field(() => String)
  logo: string;

  @Field(() => Float, { defaultValue: 0 })
  @IsNumber()
  @IsPositive()
  shippingFeePerKm: number;

  @Field(() => [MenuInput])
  menus: MenuInput[];
}
