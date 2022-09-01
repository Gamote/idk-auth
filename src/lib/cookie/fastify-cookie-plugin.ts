import { FastifyInstance } from 'fastify/types/instance';
import { parseCookies, setCookie } from './cookie-helpers';
import { CookieParseOptions, CookieSerializeOptions } from 'cookie';
import fp from 'fastify-plugin';
import { FastifyReply } from 'fastify';

/**
 * Declare the extra types added by the Fastify plugin.
 */
declare module 'fastify' {
  interface FastifyRequest {
    /**
     * Request cookies
     */
    cookies: Record<string, string>;
  }

  interface FastifyReply {
    /**
     * Set response cookie
     * @name setCookie
     * @param name Cookie name
     * @param value Cookie value
     * @param options Serialize options
     */
    setCookie(
      name: string,
      value: string,
      options?: CookieSerializeOptions,
    ): this;
  }
}

export interface FastifyCookieOptions {
  secret?: string | string[];
  parseOptions?: CookieParseOptions;
}

/**
 * Plugin for Fastify to handle cookies
 *
 * TODO: add encryption
 *
 * Info: We are not using the `@fastify/cookie` plugin because some libraries (like Next.js)
 * work with `req.raw` instead of `req` so methods like `req.setCookie` don't work.
 * @param instance
 * @param options
 */
export const fastifyCookiePlugin = fp(
  async (fastify: FastifyInstance, options: FastifyCookieOptions) => {
    // Parse cookies
    fastify.decorateRequest('cookies', null);
    fastify.addHook('onRequest', (req, res, next) => {
      req.cookies = parseCookies(req.raw, options.parseOptions);
      next();
    });

    // Set cookies method
    fastify.decorateReply(
      'setCookie',
      function (
        this: FastifyReply,
        name: string,
        value: string,
        options?: CookieSerializeOptions,
      ) {
        setCookie(this.raw, name, value, options);
      },
    );
  },
);
