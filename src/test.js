import test from 'ava'
import micro from 'micro'
import request from 'request-promise'
import listen from 'test-listen'
import nosniff from './'

const { send } = micro

// inspired by
// https://github.com/zeit/micro/blob/c09975700ab721bd5b556d5467e9a6a929875470/test/index.js
const getUrl = fn => {
  const srv = micro(nosniff(fn))
  return listen(srv)
}

test(`nosniff`, async t => {
  const fn = async (req, res) => {
    send(res, 200, 'woot')
  }

  const url = await getUrl(fn)
  const res = await request(url, { resolveWithFullResponse: true })
  t.deepEqual(res.headers[`x-content-type-options`], `nosniff`)
})
