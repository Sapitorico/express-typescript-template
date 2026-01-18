import { UserEmail } from '@/modules/users/domain/object-values/user-email.object-value'
import { UserId } from '@/modules/users/domain/object-values/user-id.object-value'
import { UserPassword } from '@/modules/users/domain/object-values/user-password.object-value'
import { v4 as uuid } from 'uuid'

export interface IUserData {
  id: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export class User {
  private readonly id: UserId
  private readonly email: UserEmail
  private readonly password: UserPassword
  private readonly createdAt: Date
  private readonly updatedAt: Date

  constructor (data: IUserData) {
    this.id = new UserId(data.id)
    this.email = new UserEmail(data.email)
    this.password = new UserPassword(data.password)
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }

  get idValue (): string {
    return this.id.value
  }

  get emailValue (): string {
    return this.email.value
  }

  get createdAtValue (): Date {
    return this.createdAt
  }

  get updatedAtValue (): Date {
    return this.updatedAt
  }

  static create ({ email, password }: Pick<IUserData, 'email' | 'password'>): User {
    return new User({
      id: uuid(),
      email,
      password,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  get passwordValue (): string {
    return this.password.value
  }

  toObject (): IUserData {
    return {
      id: this.id.value,
      email: this.email.value,
      password: this.password.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
