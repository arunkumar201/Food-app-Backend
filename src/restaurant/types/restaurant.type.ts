import { ObjectType, Field, Float, Int } from '@nestjs/graphql';

@ObjectType()
export class Menu {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;

  @Field(() => String)
  image: string;
}
@ObjectType()
export class Restaurant {
  @Field(() => Int)
  _id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  address: string;

  @Field()
  phone: string;

  @Field(() => String)
  logo: string;

  @Field()
  coverImage: string;

  @Field()
  isVerified: boolean;

  @Field(() => Float)
  rating: number;

  @Field(() => Float)
  shippingFeePerKm: number;

  @Field(() => Int)
  reviewCount: number;

  @Field()
  ownerName: string;

  @Field(() => Number)
  cityId: number;

  @Field(() => String)
  lng: string;

  @Field(() => String)
  lat: string;

  @Field(() => [String])
  categories: string[];

  @Field(() => [Menu])
  menus: Menu[];
}
