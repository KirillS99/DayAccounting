import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // protection
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
}
bootstrap();
