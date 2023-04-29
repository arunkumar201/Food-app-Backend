import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class UserAddress {
  @Field()
  street: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  country: string;
}

@ObjectType()
export class UserDetails {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field(() => UserAddress)
  address: UserAddress;
}

@ObjectType()
export class LoginResponse {
  @Field()
  access_token: string;
  @Field(() => UserDetails)
  userDetails: UserDetails;
}
