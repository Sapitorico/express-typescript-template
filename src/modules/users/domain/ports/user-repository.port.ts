import { User } from '@/modules/users/domain/entities/user.entity'

export interface IUserRepository {
  saveUser: (email: string, password: string) => Promise<User>
  getUserByEmail: (email: string) => Promise<User>
  getUserById: (id: string) => Promise<User>
}
