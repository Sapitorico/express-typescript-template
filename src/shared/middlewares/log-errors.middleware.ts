import { NextFunction, Request, Response } from 'express'

export const logErrors = (err: Error, req: Request, _: Response, next: NextFunction): void => {
  req.log.error(err.stack)
  next(err)
}
