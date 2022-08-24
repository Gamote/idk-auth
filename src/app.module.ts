import { Module } from '@nestjs/common';
import { PrismaService } from './lib/services/prisma.service';
import { UsersService } from './services/users.service';
import { AuthController } from './controllers/auth.controller';
import { MercuryStorageAdapterService } from './services/mercury-storage-adapter.service';
import { MercuryServerService } from './services/mercury-server.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    PrismaService,
    UsersService,
    MercuryStorageAdapterService,
    MercuryServerService,
  ],
})
export class AppModule {}
