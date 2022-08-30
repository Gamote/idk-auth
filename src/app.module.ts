import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { RenderModule } from './modules/render/render.module';

@Module({
  imports: [RenderModule, PrismaModule, AuthModule],
})
export class AppModule {}
