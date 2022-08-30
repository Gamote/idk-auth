import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MercuryStorageAdapterService } from './services/mercury-storage-adapter.service';
import { MercuryServerService } from './services/mercury-server.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  providers: [MercuryStorageAdapterService, MercuryServerService],
  controllers: [AuthController],
})
export class AuthModule {}
