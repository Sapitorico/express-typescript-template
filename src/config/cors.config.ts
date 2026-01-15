import cors from 'cors'

const whitelist = ['http://example1.com', 'http://example2.com']
export const corsOptionsDelegate: cors.CorsOptionsDelegate = (req, callback) => {
  let corsOptions
  const origin = req.headers.origin

  if (typeof origin === 'string' && origin.length > 0 && whitelist.includes(origin)) {
    corsOptions = { origin: true }
  } else {
    corsOptions = { origin: false }
  }
  callback(null, corsOptions)
}
