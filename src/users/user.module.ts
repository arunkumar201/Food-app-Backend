import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './../schemas/user.schema';
import { UserResolver } from './user.resolver';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ConfigModule,
  ],
  //here provider:Injection Token and useClass: is The class which we want to inject in th IOC Container
  // providers: [{ provide: UserService, useClass: UserService }],
  // Short Hand where Provide and useClass both are UserService
  //or both are same Injection Token and useClass  name
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
