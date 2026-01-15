import { NextFunction, Request, Response } from 'express'
import { JwtPayload, verify } from 'jsonwebtoken'
import { catchErrorAsync } from '@/shared/utils/catch-error'
import { Unauthorized } from '@/shared/http-error'

export class AuthWithToken {
  verifyToken = async (req: Request, _: Response, next: NextFunction): Promise<void> => {
    const authorizationHeader = req.headers.authorization
    if (authorizationHeader == null || !authorizationHeader.startsWith('Bearer ') || authorizationHeader.split(' ').length !== 2) {
      throw new Unauthorized({ code: 'AUTHORIZATION_HEADER_MISSING', message: 'Authorization header is missing or malformed' })
    }

    const token = authorizationHeader.split(' ')[1]

    if (token == null) {
      throw new Unauthorized({ code: 'AUTHORIZATION_HEADER_MISSING', message: 'Authorization header is missing or malformed' })
    }

    const promise = new Promise<JwtPayload>((resolve, reject) => {
      verify(token, process.env.JWT_SECRET,
        (err, decoded) => {
          if (decoded != null) resolve(decoded as JwtPayload)
          reject(err)
        })
    })
    const [decoded, error] = await catchErrorAsync(promise)

    if (error != null) {
      throw error
    }

    req.user = decoded
    next()
  }
}
