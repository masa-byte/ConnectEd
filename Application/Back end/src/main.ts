import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {  } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors : true});
  const bodyParser = require('body-parser');

  app.use(bodyParser.json());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // remove unknown properties from DTOs
  }));

  await app.listen(3000);
}
bootstrap();
