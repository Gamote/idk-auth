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
}
