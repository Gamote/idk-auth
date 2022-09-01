import { Controller, Get, Res, Req } from '@nestjs/common';
import { RenderService } from './render.service';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller('/')
export class RenderController {
  constructor(private viewService: RenderService) {}

  @Get('_next/*')
  @Get('static/*')
  static(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const handle = this.viewService.getNextServer().getRequestHandler();

    // We need to return the response or the request will hang
    return handle(req.raw, res.raw);
  }
}
