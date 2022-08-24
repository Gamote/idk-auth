import { Module } from '@nestjs/common';
import { PrismaService } from './lib/services/prisma.service';
import { UsersService } from './services/users.service';
import { AuthController } from './controllers/auth.controller';
import { MercuryStorageAdapterService } from './services/mercury-storage-adapter.service';
import { MercuryServerService } from './services/mercury-server.service';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { resolve } from 'path';

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
        dir: resolve(__dirname, '..'),
      }),
      { viewsDir: null },
    ),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    UsersService,
    MercuryStorageAdapterService,
    MercuryServerService,
  ],
})
export class AppModule {}
