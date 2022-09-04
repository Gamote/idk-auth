import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { MercuryServerService } from './services/mercury-server.service';
import { UsersService } from './users/users.service';
import { PasswordPageProps } from '../../shared/PasswordPageProps';
import { IdentifierPageProps } from '../../shared/IdentifierPageProps';
import { decodeState, encodeState } from '../../lib/state.helper';

export enum RoutePaths {
  REGISTER = 'register',
  IDENTIFIER = 'identifier',
  PASSWORD = 'password',
  AUTHORIZE = 'authorize',
  AUTHORIZE_RESUME = 'authorize/resume',
  TOKEN = 'token',
}

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly mercuryServerService: MercuryServerService,
  ) {}

  @Get(RoutePaths.AUTHORIZE)
  async authorize(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    console.log('Authorize::cookies', req.cookies);

    if (!req.cookies.mauth) {
      // TODO: pass state to redirect back after login
      const queryParams = new URLSearchParams();

      queryParams.append('state', encodeState({ resumeUrl: req.url }));

      return res.redirect(
        302,
        `${RoutePaths.IDENTIFIER}?${queryParams.toString()}`,
      );
    }

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

        return res
          .status(authorizationResponse.error.statusCode)
          .send(authorizationResponse.errorBody);
    }
  }

  @Get(RoutePaths.IDENTIFIER)
  async getIdentifier(@Query('state') state: string, @Res() res: FastifyReply) {
    if (!state) {
      throw new Error('We need a state to continue');
    }

    if (!decodeState(state)) {
      throw new Error('The state is invalid');
    }

    return res.render<IdentifierPageProps>(RoutePaths.IDENTIFIER, {
      state,
    });
  }

  /**
   * Post route for the identifier page
   * TODO: validate the state and the username
   *
   * @param queryState
   * @param bodyState
   * @param username
   * @param res
   */
  @Post(RoutePaths.IDENTIFIER)
  async postIdentifier(
    @Query('state') queryState: string,
    @Body('state') bodyState: string,
    @Body('username') username: string,
    @Res() res: FastifyReply,
  ) {
    if (!queryState || !bodyState) {
      throw new Error('State needs to be specified in both query and body');
    }

    if (queryState !== bodyState) {
      throw new Error('Both states must match');
    }

    if (!decodeState(bodyState)) {
      throw new Error('The state is invalid');
    }

    if (!username) {
      throw new Error('Username must be specified');
    }

    const queryParams = new URLSearchParams();

    queryParams.append('state', bodyState);
    // TODO: check if we should deliver the username in a different way
    //  e.g. Auth0 is keeping in somewhere on the server
    queryParams.append('username', username);

    return res.redirect(
      302,
      `${RoutePaths.PASSWORD}?${queryParams.toString()}`,
    );
  }

  @Get(RoutePaths.PASSWORD)
  async getPassword(
    @Query('state') state: string,
    @Query('username') username: string,
    @Res() res: FastifyReply,
  ) {
    if (!state) {
      throw new Error('We need a state to continue');
    }

    if (!decodeState(state)) {
      throw new Error('The state is invalid');
    }

    if (!username) {
      throw new Error('Username must be specified');
    }

    return res.render<PasswordPageProps>(RoutePaths.PASSWORD, {
      state,
      username,
    });
  }

  @Post(RoutePaths.PASSWORD)
  async postPassword(
    @Query('state') queryState: string,
    @Body('state') bodyState: string,
    @Query('username') username: string,
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
    @Body() body: any,
  ) {
    if (!queryState || !bodyState) {
      throw new Error('State needs to be specified in both query and body');
    }

    if (queryState !== bodyState) {
      throw new Error('Both states must match');
    }

    if (!decodeState(bodyState)) {
      throw new Error('The state is invalid');
    }

    if (!username) {
      throw new Error('Username must be specified');
    }

    let user;

    // Check if the user exists and if the password is correct
    try {
      user = await this.userService.validate(body.username, body.password);
    } catch (e) {
      return res.render<PasswordPageProps>(RoutePaths.PASSWORD, {
        error: e.message,
        state: bodyState,
        username,
      });
    }

    console.log('Login::cookies', req.cookies);
    console.log('Login::body', body);
    console.log('Login::user', user);

    // Set session cookie
    // TODO: set the user in the session
    res.setCookie('mauth', `secret-userId-${user.id}`, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // TODO: read state1 and transform it into a state2 to be consumed by authorize/resume?state=${state2}
    const state2 = bodyState;

    return res.redirect(302, `${RoutePaths.AUTHORIZE_RESUME}?state=${state2}`);
  }

  @Get(RoutePaths.REGISTER)
  async getRegister(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    return res.render(RoutePaths.REGISTER, undefined);
  }

  @Post(RoutePaths.REGISTER)
  async postRegister() {
    throw new Error('Method not implemented.');
  }

  @Get(RoutePaths.AUTHORIZE_RESUME)
  async getAuthorizeResume(
    @Query('state') state: string,
    @Res() res: FastifyReply,
  ) {
    if (!state) {
      throw new Error('We need a state to continue');
    }

    const decodedState = decodeState(state);

    if (!decodedState) {
      throw new Error('The state is invalid');
    }

    return res.redirect(302, decodedState.resumeUrl);
  }

  @Post(RoutePaths.TOKEN)
  async postToken(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const tokenResponse = await this.mercuryServerService.server.token(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.mercuryServerService.requestToMercuryRequest(req),
    );

    if ('data' in tokenResponse) {
      return res.status(200).send(tokenResponse.data);
    }

    return res
      .status(tokenResponse.error.statusCode)
      .send(tokenResponse.errorBody);
  }

  // TODO: delete after testing
  @Get('callback')
  async callback(@Req() req: FastifyRequest) {
    // TODO: implement
    return {
      query: req.query,
    };
  }
}
