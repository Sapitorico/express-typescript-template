export class UserPassword {
  private readonly minLength = 8
  private readonly maxLength = 64

  constructor (public value: string) {
    this.validateValue()
  }

  private readonly validateValue = (): void => {
    if (this.value === null || this.value === undefined || this.value.trim() === '') {
      throw new Error('Password is not defined')
    }
    if (typeof this.value !== 'string') {
      throw new Error('Password must be a string')
    }
    if (this.value.trim().length < this.minLength) {
      throw new Error('Password must be at least 8 characters long')
    }
    if (this.value.length > this.maxLength) {
      throw new Error('Password must be at most 64 characters long')
    }
  }
}
