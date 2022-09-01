import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { MercuryServerService } from './services/mercury-server.service';
import { UsersService } from './users/users.service';
import { LoginPageProps } from '../../../shared/LoginPageProps';
import { NextRendererService } from '@app/next-renderer';

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly mercuryServerService: MercuryServerService,
    private readonly nextRendererService: NextRendererService,
  ) {}

  @Get('login')
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
    return this.nextRendererService.render(
      req.raw,
      res.raw,
      '/login',
      undefined,
    );
  }

  @Post('login')
  async postLogin(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
    @Body() body: any,
  ) {
    console.log('Login::cookies', req.cookies);
    console.log('Login::body', body);

    let user;

    try {
      user = await this.userService.validate(body.username, body.password);
    } catch (e) {
      return this.nextRendererService.render<LoginPageProps>(
        req.raw,
        res.raw,
        '/login',
        {
          error: e.message,
        },
      );
    }

    // TODO: set the user in the session
    console.log('Login::user', user);

    res.setCookie('mauth', `secret-${user.id}`, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(302).redirect('/');
  }

  @Get('register')
  async getRegister(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    return this.nextRendererService.render(
      req.raw,
      res.raw,
      '/register',
      undefined,
    );
  }

  @Post('register')
  async postRegister(@Body() body: any) {
    throw new Error('Method not implemented.');
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
