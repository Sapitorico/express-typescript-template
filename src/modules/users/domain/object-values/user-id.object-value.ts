import { validate } from 'uuid'

export class UserId {
  constructor (public value: string) {
    this.isValid(value)
  }

  private isValid (value: string): void {
    if (validate(value) == null) {
      throw new Error('Invalid UUID format')
    }
  }
}
