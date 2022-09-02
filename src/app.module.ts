import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { NextRendererModule } from 'nest-next-renderer';

@Module({
  imports: [
    NextRendererModule.forRoot({
      // TODO: move some to a config
      dev: process.env.NODE_ENV !== 'production',
      dir: './client',
    }),
    PrismaModule,
    AuthModule,
  ],
})
export class AppModule {}
