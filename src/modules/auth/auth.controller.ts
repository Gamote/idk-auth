import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { MercuryServerService } from './services/mercury-server.service';
import { RenderService } from "../render/render.service";

@Controller()
export class AuthController {
  constructor(private readonly mercuryServerService: MercuryServerService, private readonly renderService: RenderService) {
    //
  }

  @Get('login')
  // @Render('login')
  async getLogin(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    // Return directly
    // return {
    //   props: {
    //     isLoggedIn: false,
    //   }
    // };

    // Render an 404 with nextjs
    // return this.renderService.getNextServer().render404(req.raw, res.raw);

    // Render an 404 without nextjs
    // TODO

    // Render the page with nextjs
    return this.renderService.getNextServer()
      // @ts-ignore
      .render(req.raw, res.raw, '/login', { best: "world", r: 323, rsisr: {rsiris: 22} });

  }

  @Post('login')
  @Render('Index')
  async postLogin(@Body() body: any) {
    console.log('postLogin values', body);
    return {};
  }

  @Post('register')
  async register(@Body() body: any) {
    console.log('register values', body);
  }

  @Get('authorize')
  async authorize(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    // TODO: get the user
    // TODO: if not logged in, redirect to login page and pass the current URL as a query param so we can redirect back to it after login
    const user = { id: 'test-user-id' };

    const authorizationResponse =
      await this.mercuryServerService.server.authorize(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.mercuryServerService.requestToMercuryRequest(req),
        user,
      );

    switch (authorizationResponse.__typename) {
      // If success redirect
      case 'AuthorizationSuccessResponse':
        return res.status(302).redirect(authorizationResponse.redirectUri);

      // If error redirect to a redirect URI if provided, otherwise return the error
      case 'AuthorizationErrorResponse':
        if (authorizationResponse.redirectUri) {
          return res.status(302).redirect(authorizationResponse.redirectUri);
        }

        return authorizationResponse.error;
    }
  }

  // TODO: delete after testing
  @Get('callback')
  async callback(@Req() req: FastifyRequest) {
    return {
      query: req.query,
    };
  }
}
