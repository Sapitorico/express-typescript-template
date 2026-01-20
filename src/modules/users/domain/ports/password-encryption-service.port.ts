export interface IPasswordEncryptionService {
  hashPassword: (password: string) => Promise<string>
  comparePassword: (plainPassword: string, encryptedPassword: string) => Promise<void>
}
