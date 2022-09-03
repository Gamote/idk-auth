import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ErrorPassThroughLevel, NextRendererModule } from 'nest-next-renderer';

@Module({
  imports: [
    NextRendererModule.forRoot({
      // TODO: move some to a config
      nextServerOptions: {
        dir: './client',
      },
      errorPassThrough: ErrorPassThroughLevel.ALL,
    }),
    PrismaModule,
    AuthModule,
  ],
})
export class AppModule {}
