import 'jsonwebtoken'

declare module 'jsonwebtoken'{
  interface JwtPayload {
    id: string
    email: string
  }
}
