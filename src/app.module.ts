import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { RenderModule } from './modules/render/render.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [RenderModule, PrismaModule, AuthModule],
})
export class AppModule {}
