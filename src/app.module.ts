import { Module } from '@nestjs/common';
import { RenderModule } from './modules/render/render.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [RenderModule, PrismaModule, UsersModule, AuthModule],
})
export class AppModule {}
