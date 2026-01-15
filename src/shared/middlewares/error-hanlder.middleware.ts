import { HttpError, InternalServer } from '@/shared/http-error'
import { NextFunction, Request, Response } from 'express'

export const errorHandler = (err: Error, _: Request, res: Response, _next: NextFunction): void => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json(err.toJSON())
  } else {
    res.status(500).json(new InternalServer({}).toJSON())
  }
}
