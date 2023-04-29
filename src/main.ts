import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { NextFunction, Request, Response } from 'express';
// function GlobalMiddleWareOne(req: Request, res: Response, next: NextFunction) {
//   console.log('Global MiddleWare One Executed');
//   next();
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // enable auto-conversion of incoming data types
      transformOptions: {
        enableImplicitConversion: true, // allow implicit conversion of data types
      },
    }),
  );
  // app.use(GlobalMiddleWareOne);
  await app.listen(3000);
}
bootstrap();
