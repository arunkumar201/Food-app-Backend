import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { MongooseConfigService } from './mongoose-config.service';
import { MongooseModelsModule } from './schemas/mongoose-models.module';
import { OrderModule } from './Orders/order.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.dev.env'],
      //Cache option which allows us to catch the env variable
      cache: true,
      expandVariables: true,
      isGlobal: true,
    }), // Import the ConfigModule and load environment variables
    UserModule,
    OrderModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE_TIME },
    }),
    //1st way to use mongodb to connect
    //forRoot returns the dynamic module
    MongooseModule.forRootAsync({
      // Use MongooseModule.forRootAsync() to asynchronously get the database URL from the ConfigService
      // imports: [ConfigModule], // Import the ConfigModule in the MongooseModule scope
      useClass: MongooseConfigService,
    }),
    //forRoot returns the dynamic module
    //option-1 to use Mongoose integration
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     uri: configService.get<string>('DATABASE_URL'),
    //   }),
    // }),
    //option-2 to integrate the Mongoose in nestjs
    MongooseModule.forRootAsync({
      // Use MongooseModule.forRootAsync() to asynchronously get the database URL from the ConfigService
      //if we isGlobal to true then we don't need to import the ConfigModule
      // imports: [ConfigModule], // Import the ConfigModule in the MongooseModule scope
      useClass: MongooseConfigService,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
    MongooseModelsModule,
    RestaurantModule,
  ],
  controllers: [AppController],
  providers: [AuthService, AppService, JwtService],
})
export class AppModule {}
