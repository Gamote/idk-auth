import { Controller, Get, Res, Req } from '@nestjs/common';
import { RenderService } from './render.service';
import { FastifyReply, FastifyRequest } from 'fastify';

// TODO: replace with filter
// https://github.com/kyle-mccarthy/nest-next/blob/156b4b5cd00951b898e5c4c647337ce32bae75f5/lib/render.filter.ts#L51
@Controller('/')
export class RenderController {
  constructor(private viewService: RenderService) {}

  @Get('_next/*')
  @Get('static/*')
  static(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    console.log("console.log()");
    const handle = this.viewService.getNextServer().getRequestHandler();

    // We need to return the response or the request will hang
    return handle(req.raw, res.raw);
  }
}
