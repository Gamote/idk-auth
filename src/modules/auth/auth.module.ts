import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MercuryStorageAdapterService } from './services/mercury-storage-adapter.service';
import { MercuryServerService } from './services/mercury-server.service';

@Module({
  providers: [MercuryStorageAdapterService, MercuryServerService],
  controllers: [AuthController],
})
export class AuthModule {}
