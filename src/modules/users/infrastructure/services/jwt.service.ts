import { catchErrorAsync } from '@/shared/utils/catch-error'
import { IJWTService } from '@/modules/users/domain/ports/jwt-service.port'
import { sign, type JwtPayload, Algorithm, SignOptions } from 'jsonwebtoken'
import { IUserData } from '@/modules/users/domain/entities/user.entity'

export class JwtService implements IJWTService {
  private readonly jwtSecret = process.env.JWT_SECRET
  private readonly algorithm: Algorithm = 'HS256'
  private readonly expiresIn: SignOptions['expiresIn'] = '7d'

  generateToken = async ({ id, email }: Pick<Required<IUserData>, 'id' | 'email'>): Promise<string> => {
    const payload: JwtPayload = {
      id,
      email
    }

    const promise = new Promise<string>((resolve, reject) => {
      sign(payload, this.jwtSecret, { algorithm: this.algorithm, expiresIn: this.expiresIn },
        (err, token) => {
          if (token != null) resolve(token)
          reject(err)
        })
    })

    const [token, error] = await catchErrorAsync(promise)

    if (error != null) {
      throw error
    }

    return token
  }
}
