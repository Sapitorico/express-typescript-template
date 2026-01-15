import pino from 'pino-http'

export default pino({
  level: process.env.PINO_LOG_LEVEL ?? 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:HH:MM:ss',
      ignore: 'pid,hostname'
    }
  }
})
