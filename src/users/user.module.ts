import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    //User to creating the Models
    //we can remove this below line as we defined models Global
    // MongooseModule.forFeature([{ name: USER_MODEL, schema: UserSchema }]),
    ConfigModule,
  ],
  //here provider:Injection Token and useClass: is The class which we want to inject in th IOC Container
  // providers: [{ provide: UserService, useClass: UserService }],
  // Short Hand where Provide and useClass both are UserService
  //or both are same Injection Token and useClass  name
  providers: [UserService, UserResolver],
  //if we want to use above mongoose module somewhere in the application
  //then we need to exports it as MongooseModule
  exports: [UserService],
})
export class UserModule {}
