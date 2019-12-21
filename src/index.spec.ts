import { IncomingMessage, ServerResponse } from 'http'
import test, { ExecutionContext } from 'ava'
import micro, { send } from 'micro'
import request from 'request-promise'
import listen from 'test-listen'
import nosniff, { RequestHandler } from './'

// inspired by
// https://github.com/zeit/micro/blob/c09975700ab721bd5b556d5467e9a6a929875470/test/index.js
const getUrl = (fn: RequestHandler): Promise<string> => {
  const srv = micro(nosniff(fn))
  return listen(srv)
}

const fn: RequestHandler = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  send(res, 200, 'woot')
}

test(`nosniff`, async (t: ExecutionContext) => {
  const url: string = await getUrl(fn)
  const res: IncomingMessage = await request(url, {
    resolveWithFullResponse: true,
  })
  t.deepEqual(res.headers[`x-content-type-options`], `nosniff`)
})
