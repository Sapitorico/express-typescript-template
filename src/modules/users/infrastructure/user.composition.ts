import { UserUseCases } from '@/modules/users/application/use-cases/users.use-cases'
import { UserController } from '@/modules/users/infrastructure/user.controller'
import { UserRepository } from '@/modules/users/infrastructure/repositories/user.repository'
import { DtoParser } from '@/modules/users/infrastructure/services/dto-parser.service'
import { JwtService } from '@/modules/users/infrastructure/services/jwt.service'
import { PasswordService } from '@/modules/users/infrastructure/services/password.service'
import prisma from '@/shared/lib/prisma'

export const compositionUser = (): { userController: UserController } => {
  // DRIVENS
  const userRepository = new UserRepository(prisma)
  const passwordEncryptionService = new PasswordService()
  const jwtService = new JwtService()
  // APP
  const userUseCases = new UserUseCases(userRepository, passwordEncryptionService, jwtService)
  // DRIVERS
  const dtoParser = new DtoParser()
  const userController = new UserController(userUseCases, dtoParser)
  return { userController }
}
