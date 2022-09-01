import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './modules/prisma/prisma.service';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { fastifyCookiePlugin } from './lib/cookie/fastify-cookie-plugin';

const bootstrap = async () => {
  const fastify = new FastifyAdapter();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastify,
  );

  // Add the cookie plugin to the Fastify instance
  await app.register(fastifyCookiePlugin, {
    // TODO: move to `.env`
    secret: 'my-secret', // for cookies signature
  });

  // Enable shutdown hooks
  // https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
  await app.get(PrismaService).enableShutdownHooks(app);

  await app.listen(3400, '0.0.0.0');
};

void bootstrap();
