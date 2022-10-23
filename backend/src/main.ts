import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from 'src/prisma.service';
import * as fs from 'fs';

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


  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app)

  const config = new DocumentBuilder()
    .setTitle('SchoolUtilities API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./swagger.json', JSON.stringify(document));
  SwaggerModule.setup('api-docs', app, document);

  app.enableCors({
    origin: '*',
  });
  await app.listen(8888);
}

bootstrap();
