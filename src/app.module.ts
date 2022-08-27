import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RenderModule } from 'nest-next';
import Next from 'next';

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({
        // dev: process.env.NODE_ENV !== 'production',
        dev: false,
        dir: './client',
      }),
      {
        passthrough404: true,
        viewsDir: null,
      },
    ),
    PrismaModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
