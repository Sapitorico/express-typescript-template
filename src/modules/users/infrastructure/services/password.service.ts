import { IPasswordEncryptionService } from '@/modules/users/domain/ports/password-encryption-service.port'
import { Unauthorized } from '@/shared/http-error'
import { hash, compare } from 'bcrypt'

export class PasswordService implements IPasswordEncryptionService {
  hashPassword = async (password: string): Promise<string> => {
    return await hash(password, 10)
  }

  comparePassword = async (plainPassword: string, encryptedPassword: string): Promise<void> => {
    const result = await compare(plainPassword, encryptedPassword)
    if (!result) {
      throw new Unauthorized({ code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' })
    }
  }
}
