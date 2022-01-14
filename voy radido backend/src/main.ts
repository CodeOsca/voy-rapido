import { ResponseToJsonInterceptor } from './shared/interceptors/response-to-json.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { SharedModule } from './shared/shared.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get('ConfigService');

  app.enableCors();
  app.setGlobalPrefix('voyrapido/api/v1');
  app.useGlobalInterceptors(new ResponseToJsonInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
    }),
  );

  useContainer(app.select(SharedModule), { fallbackOnErrors: true });

  if (config.get('NODE_ENV') === 'development') {
    const configSwagger = new DocumentBuilder()
      .setTitle('API VoyRapido')
      .setVersion('1.0')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'bearer' })
      .build();

    const document = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup('voyrapido/api', app, document, {
      swaggerOptions: {
        filter: true,
        persistAuthorization: true,
      },
    });
  }

  await app.listen(config.get('PORT'));
}
bootstrap();
