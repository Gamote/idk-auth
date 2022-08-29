import { IncomingMessage, ServerResponse } from "http";
import { CookieParseOptions, CookieSerializeOptions, parse, serialize } from "cookie";

export const parseCookies = (req: IncomingMessage, options?: CookieParseOptions): Record<string, string> => {
  return parse(req.headers.cookie || '', options);
}

export const setCookie = (res: ServerResponse, name: string, value: string, options?: CookieSerializeOptions): void => {
  res.setHeader("Set-Cookie", serialize(name, value, options));
}
