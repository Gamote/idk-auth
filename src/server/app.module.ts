import { Module } from '@nestjs/common';
import { PrismaService } from './lib/services/prisma.service';
import { UsersService } from './services/users.service';
import { AuthController } from './controllers/auth.controller';
import { MercuryStorageAdapterService } from './services/mercury-storage-adapter.service';
import { MercuryServerService } from './services/mercury-server.service';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { resolve } from 'path';
import { ViewModule } from './modules/view/view.module';

@Module({
  imports: [
    // RenderModule.forRootAsync(
    //   Next({
    //     dev: process.env.NODE_ENV !== 'production',
    //     dir: resolve(__dirname, '..'),
    //     customServer: true,
    //   }),
    //   { passthrough404: true, viewsDir: null },
    // ),
    ViewModule,
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
