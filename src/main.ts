import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './modules/prisma/prisma.service';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Allow all CORS
  app.enableCors({
    origin: '*',
  });

  // Enable shutdown hooks
  // https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
  await app.get(PrismaService).enableShutdownHooks(app);

  await app.listen(3400, '0.0.0.0');
};

void bootstrap();
