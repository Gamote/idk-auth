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
      customServer: true,
      conf: {
        // Disabling file-system routing, so we can explicitly handle the routing
        // https://nextjs.org/docs/advanced-features/custom-server#disabling-file-system-routing
        useFileSystemPublicRoutes: false,
      },
    }),
    PrismaModule,
    AuthModule,
  ],
})
export class AppModule {}
