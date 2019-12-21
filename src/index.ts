/**
 * nosniff
 * to make sure the browser does not try to detect a
 * different Content-Type than what is actually sent as that could open XSS
 */
import { IncomingMessage, ServerResponse } from 'http'

export type RequestHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  /* eslint-disable @typescript-eslint/no-explicit-any */
  ...restArgs: Array<(...a: any[]) => any>
) => any
/* eslint-enable @typescript-eslint/no-explicit-any */

export default (handler: RequestHandler) => (
  req: IncomingMessage,
  res: ServerResponse,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  ...restArgs: Array<(...a: any[]) => any>
): RequestHandler => {
  res.setHeader(`X-Content-Type-Options`, `nosniff`)
  return handler(req, res, ...restArgs)
}
