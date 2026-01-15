import { IPasswordEncryptionService } from '@/modules/users/domain/ports/password-encryption-service.port'
import { hash, compare } from 'bcrypt'

export class PasswordService implements IPasswordEncryptionService {
  hashPassword = async (password: string): Promise<string> => {
    return await hash(password, 10)
  }

  comparePassword = async (plainPassword: string, encryptedPassword: string): Promise<boolean> => {
    return await compare(plainPassword, encryptedPassword)
  }
}
