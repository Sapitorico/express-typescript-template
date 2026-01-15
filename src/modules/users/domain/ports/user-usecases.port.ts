import { IUserData } from '@/modules/users/domain/entities/user.entity'

export type IPublicUserData = Omit<IUserData, 'password'>

export interface IUserUseCases {
  registerUser: (email: string, password: string) => Promise<{ user: IPublicUserData, token: string }>
  loginUser: (email: string, password: string) => Promise<{ user: IPublicUserData, token: string }>
  getUserProfile: (id: string) => Promise<IPublicUserData>
}
