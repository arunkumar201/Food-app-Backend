import { UserService } from './user.service';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { ConfigModule } from '@nestjs/config';
import { UserMiddleware } from './user.middleware';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    //User to creating the Models
    //we can remove this below line as we defined models Global
    // MongooseModule.forFeature([{ name: USER_MODEL, schema: UserSchema }]),
    ConfigModule,
    JwtModule,
  ],
  //here provider:Injection Token and useClass: is The class which we want to inject in th IOC Container
  // providers: [{ provide: UserService, useClass: UserService }],
  // Short Hand where Provide and useClass both are UserService
  //or both are same Injection Token and useClass  name
  providers: [UserService, UserResolver, JwtStrategy],
  //if we want to use above mongoose module somewhere in the application
  //then we need to exports it as MongooseModule
  exports: [UserService],
})
// export class UserModule {}
export class UserModule implements NestModule {
  // The MiddlewareConsumer is a helper class. It provides several built-in methods to manage middleware
  //  The forRoutes() method can take a single string, multiple strings, a RouteInfo object,
  //  a controller class and even multiple controller classes.
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('user');
  }
}
