import { IJWTService } from '@/modules/users/domain/ports/jwt-service.port'
import { IPasswordEncryptionService } from '@/modules/users/domain/ports/password-encryption-service.port'
import { IUserRepository } from '@/modules/users/domain/ports/user-repository.port'
import { IUserUseCases, IPublicUserData } from '@/modules/users/domain/ports/user-usecases.port'

export class UserUseCases implements IUserUseCases {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly passwordEncryptionService: IPasswordEncryptionService,
    private readonly jwtService: IJWTService
  ) {}

  registerUser = async (email: string, password: string): Promise<{ user: IPublicUserData, token: string }> => {
    const passwordHash = await this.passwordEncryptionService.hashPassword(password)
    const user = await this.userRepository.saveUser(email, passwordHash)
    const token = await this.jwtService.generateToken({ ...user.toPublicDTO() })
    return { user: user.toPublicDTO(), token }
  }

  loginUser = async (email: string, password: string): Promise<{ user: IPublicUserData, token: string }> => {
    const user = await this.userRepository.getUserByEmail(email)
    await this.passwordEncryptionService.comparePassword(password, user.passwordValue)
    const token = await this.jwtService.generateToken({ ...user.toPublicDTO() })
    return { user: user.toPublicDTO(), token }
  }

  getUserProfile = async (id: string): Promise<IPublicUserData> => {
    const user = await this.userRepository.getUserById(id)
    return user.toPublicDTO()
  }
}
