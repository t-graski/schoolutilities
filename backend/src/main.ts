import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      validateCustomDecorators: true,
      whitelist: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: '*',
  });
  await app.listen(8888);
}

bootstrap();
