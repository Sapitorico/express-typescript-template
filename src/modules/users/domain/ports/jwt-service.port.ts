import { IUserData } from '@/modules/users/domain/entities/user.entity'

export interface IJWTService {
  generateToken: (userData: Pick<Required<IUserData>, 'id' | 'email'>) => Promise<string>
}
