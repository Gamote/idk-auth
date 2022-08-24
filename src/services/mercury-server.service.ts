import { Injectable } from '@nestjs/common';
import {
  MercuryServer,
  MercuryRequest,
  MercuryRequestType,
} from 'mercury-auth';
import { MercuryStorageAdapterService } from './mercury-storage-adapter.service';

@Injectable()
export class MercuryServerService {
  server: MercuryServer;

  constructor() {
    this.server = new MercuryServer({
      baseUrl: 'http://localhost:3400',
      storageAdapter: new MercuryStorageAdapterService(),
    });
  }

  /**
   * Method to convert a request to a MercuryRequest
   * TODO: create an adapter or find a better way to send the request
   * @param request
   */
  requestToMercuryRequest(request: MercuryRequestType): MercuryRequest {
    return new MercuryRequest({
      // TODO: maybe we should allow this to be a string and act on invalid values inside request handlers?
      //  if not, we should throw an error if the value is not a {@link MercuryRequestMethod}
      method: request.method,
      headers: request.headers,
      params: request.params,
      query: request.query,
      body: request.body,
    });
  }

  /**
   * TODO: describe this
   * @param request
   * @param reply
   */
  async authorizeHandler(request: MercuryRequestType, reply): Promise<void> {
    // TODO: get the user
    // TODO: if not logged in, redirect to login page and pass the current URL as a query param so we can redirect back to it after login
    const user = { id: 'test-user-id' };

    const authorizationResponse = await this.server.authorize(
      this.requestToMercuryRequest(request),
      user,
    );

    switch (authorizationResponse.__typename) {
      // If success redirect
      case 'AuthorizationSuccessResponse':
        return reply.redirect(authorizationResponse.redirectUri);

      // If error redirect to a redirect URI if provided, otherwise return the error
      case 'AuthorizationErrorResponse':
        if (authorizationResponse.redirectUri) {
          return reply.redirect(authorizationResponse.redirectUri);
        }

        return reply.send(authorizationResponse.redirectUri);
    }
  }
}
