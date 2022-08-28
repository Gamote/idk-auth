import { Global, Module } from "@nestjs/common";

import { RenderController } from './render.controller';
import { RenderService } from './render.service';

@Global()
@Module({
  providers: [RenderService],
  controllers: [RenderController],
  exports: [RenderService],
})
export class RenderModule {}
