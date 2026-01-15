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

  static create (email: string, password: string): User {
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

  /**
   * Returns all user data including sensitive information.
   * Use this method only when all data is required (e.g., for persistence operations).
   *
   * @returns Complete user data including sensitive fields
   */
  toPrivateDTO (): IUserData {
    return {
      id: this.id.value,
      email: this.email.value,
      password: this.password.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }

  /**
   * Returns user data without sensitive information.
   * Use this method when exposing user data to external systems.
   *
   * @returns User data excluding sensitive fields
   */
  toPublicDTO (): Omit<IUserData, 'password'> {
    return {
      id: this.id.value,
      email: this.email.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
