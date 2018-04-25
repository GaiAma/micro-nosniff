/**
 * nosniff
 * to make sure the browser does not try to detect a
 * different Content-Type than what is actually sent (can lead to XSS)
 */
export default handler => (req, res, ...restArgs) => {
  res.setHeader(`X-Content-Type-Options`, `nosniff`)
  return handler(req, res, restArgs)
}
