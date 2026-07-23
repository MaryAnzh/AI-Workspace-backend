import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import * as C from './constants';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle(C.AI_WORKSPACE_PORTFOLIO)
    .setDescription(`${C.AI_WORKSPACE_PORTFOLIO} ${C.API_DOCS}`)
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(C.ROUTES.SWAGGER, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 4000);
  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: '*',
  });
  app.use(
    `/${C.ROUTES.UPLOADS}`,
    express.static(join(process.cwd(), C.ROUTES.UPLOADS)),
  );
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Server is running on http://localhost:${port}`, 'Bootstrap');
  console.log(
    `📘 Swagger documentation is available at http://localhost:${port}/${C.ROUTES.SWAGGER}`,
    'Bootstrap',
  );
}
bootstrap().catch((err) => {
  console.error(C.ERROR_BOOTSTRAP, err);
});
