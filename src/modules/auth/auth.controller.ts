import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { MercuryServerService } from './services/mercury-server.service';

@Controller()
export class AuthController {
  constructor(private readonly mercuryServerService: MercuryServerService) {
    //
  }

  @Post('login')
  async login(@Body() body: any) {
    console.log('login values', body);
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
