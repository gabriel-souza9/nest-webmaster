import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  const PORT = 3000;
  console.log(`app running port in ${PORT}`);
  await app.listen(PORT);
}
bootstrap();
