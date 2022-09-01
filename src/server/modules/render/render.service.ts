import { Injectable, OnModuleInit } from '@nestjs/common';
import next from 'next';
import { NextServer } from 'next/dist/server/next';
import { BaseNextRequest, BaseNextResponse } from 'next/dist/server/base-http';
import { IncomingMessage, ServerResponse } from 'http';

@Injectable()
export class RenderService implements OnModuleInit {
  private server: NextServer;

  async onModuleInit(): Promise<void> {
    try {
      this.server = next({
        // TODO: move to module config
        dev: process.env.NODE_ENV !== 'production',
        dir: './src/client',
        customServer: true,
        conf: {
          // Disabling file-system routing, so we can explicitly handle the routing
          // https://nextjs.org/docs/advanced-features/custom-server#disabling-file-system-routing
          useFileSystemPublicRoutes: false,
        },
      });

      await this.server.prepare();
    } catch (error) {
      console.log(error);
    }
  }

  getNextServer(): NextServer {
    return this.server;
  }

  // TODO: replace with filter
  // https://github.com/kyle-mccarthy/nest-next/blob/156b4b5cd00951b898e5c4c647337ce32bae75f5/lib/render.filter.ts#L51
  render<Props>(
    req: BaseNextRequest | IncomingMessage,
    res: ServerResponse | BaseNextResponse,
    pathname: string,
    props: Props,
  ): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.server.render(req, res, pathname, { props: props ?? {} });
  }
}
