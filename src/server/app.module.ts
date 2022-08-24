import { Module } from '@nestjs/common';
import { PrismaService } from './lib/services/prisma.service';
import { UsersService } from './services/users.service';
import { AuthController } from './controllers/auth.controller';
import { MercuryStorageAdapterService } from './services/mercury-storage-adapter.service';
import { MercuryServerService } from './services/mercury-server.service';
import { ViewModule } from './modules/view/view.module';

@Module({
  imports: [ViewModule],
  controllers: [AuthController],
  providers: [
    PrismaService,
    UsersService,
    MercuryStorageAdapterService,
    MercuryServerService,
  ],
})
export class AppModule {}
