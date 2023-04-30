import { IsOptional, IsPhoneNumber } from '@nestjs/class-validator';
import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator';

@InputType()
class MenuUpdateInput {
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
export class UpdateRestaurantInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  ownerName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  categories?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  address?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  lat?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  lng?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  coverImage?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  logo?: string;

  @Field(() => Float, { nullable: true, defaultValue: 0 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  shippingFeePerKm?: number;

  @Field(() => [MenuUpdateInput], { nullable: true })
  @IsOptional()
  menus?: MenuUpdateInput[];
}
