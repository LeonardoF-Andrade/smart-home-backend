import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export const espIP = 'http://192.168.5.167';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
