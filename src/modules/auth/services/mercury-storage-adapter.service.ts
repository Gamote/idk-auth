import {
  AuthorizationCode,
  Client,
  Falsey,
  GrantType,
  IBaseStorageAdapter,
  RefreshToken,
  Token,
} from 'mercury-auth';
import { Injectable } from '@nestjs/common';

type MemoryUser = {
  id: string;
};

@Injectable()
export class MercuryStorageAdapterService
  implements IBaseStorageAdapter<MemoryUser>
{
  private codes: AuthorizationCode<MemoryUser>[] = [];
  private availableScopes = [
    'openid',
    'profile',
    'email',
    'address',
    'phone',
    'offline_access',
  ];
  private clients = [
    // TODO: this needs to be registered somehow
    {
      id: 'test_client_id',
      type: 'confidential', // or public
      name: 'test_client',
      secret: 'test_client_secret',
      grants: [GrantType.AuthorizationCode],
      redirectUris: ['http://localhost:3000/callback'],
    },
  ];
  private tokens: (Token & { clientId: string })[] = [];
  private refreshTokens: (RefreshToken & { clientId: string })[] = [];

  getAuthorizationCode(
    authorizationCode: string,
  ): Promise<AuthorizationCode<MemoryUser>> {
    const code = this.codes.find(
      (c) => c.authorizationCode === authorizationCode,
    );

    if (!code) {
      throw new Error('Authorization code not found');
    }

    return Promise.resolve(code);
  }

  getClient(clientId: string, clientSecret?: string): Promise<Client | Falsey> {
    const client = this.clients.find((c) => c.id === clientId);

    if (clientSecret && client?.secret !== clientSecret) {
      return Promise.resolve(false);
    }

    return Promise.resolve(client);
  }

  getRefreshToken(
    refreshToken: string,
  ): Promise<(RefreshToken & { clientId: string }) | Falsey> {
    const response = this.refreshTokens.find(
      (rT) => rT.refreshToken === refreshToken,
    );

    if (!response) {
      // TODO: throw error?
      return Promise.resolve(null);
    }

    return Promise.resolve(response);
  }

  // TODO: removing the return type should preserve the right return type
  getUser(username: string, password: string) {
    return Promise.resolve({ id: 'test_user_id' });
  }

  getUserFromClientId(clientId: string): Promise<MemoryUser | Falsey> {
    return Promise.resolve(undefined);
  }

  revokeAuthorizationCode(
    authorizationCode: AuthorizationCode,
  ): Promise<boolean> {
    const codeIndex = this.codes.findIndex(
      (c) => c.authorizationCode === authorizationCode.authorizationCode,
    );

    // Remove index from array
    if (codeIndex > -1) {
      this.codes.splice(codeIndex, 1);
      return Promise.resolve(true);
    }

    return Promise.resolve(false);
  }

  revokeToken(token: RefreshToken | Token): Promise<boolean> {
    return Promise.resolve(false);
  }

  saveAuthorizationCode(
    authorizationCode: Pick<
      AuthorizationCode,
      | 'authorizationCode'
      | 'authorizationCodeExpiresAt'
      | 'redirectUri'
      | 'scope'
    >,
    client: Client,
    user: MemoryUser,
  ) {
    const authorizationCodeObject: AuthorizationCode<MemoryUser> = {
      authorizationCode: authorizationCode.authorizationCode,
      authorizationCodeExpiresAt: authorizationCode.authorizationCodeExpiresAt,
      redirectUri: authorizationCode.redirectUri,
      scope: authorizationCode.scope,
      client,
      user,
    };

    this.codes.push(authorizationCodeObject);

    return Promise.resolve(authorizationCodeObject);
  }

  saveToken(
    token: Token,
    client: Client,
    user: MemoryUser,
  ): Promise<Token | Falsey> {
    const data = {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      scope: token.scope,
      // Custom attributes
      first: 'custom attribute',
      second: 2,
    };

    this.tokens.push({ ...data, clientId: client.id });

    return Promise.resolve(data);
  }

  saveRefreshToken(
    token: RefreshToken,
    client: Client,
    user: MemoryUser,
  ): Promise<RefreshToken | Falsey> {
    const data = {
      ...token,
      clientId: client.id,
      first: 'custom refresh attribute',
      second: 2,
    };
    this.refreshTokens.push(data);

    return Promise.resolve(data);
  }

  verifyScope(token: Token, scope: string | string[]): Promise<boolean> {
    return Promise.resolve(false);
  }

  validateScope(
    client: Client,
    user: MemoryUser,
    scope: string[],
  ): Promise<string[] | Falsey> {
    return Promise.resolve(
      scope.every((s) => this.availableScopes.includes(s)) ? scope : false,
    );
  }
}
