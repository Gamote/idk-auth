import { Controller, Get, Res, Req } from '@nestjs/common';

import { ViewService } from './view.service';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller('/')
export class ViewController {
  constructor(private viewService: ViewService) {}

  @Get('*')
  static(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const handle = this.viewService.getNextServer().getRequestHandler();

    // We need to return the response or the request will hang
    return handle(req.raw, res.raw);
  }
}
