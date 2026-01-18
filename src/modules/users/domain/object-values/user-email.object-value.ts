export class UserEmail {
  private readonly regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  constructor (public value: string) {
    this.validateValue()
    this.validateRegEx()
  }

  private readonly validateValue = (): void => {
    if (this.value === null || this.value === undefined) {
      throw new Error('Email is not defined')
    }
    if (typeof this.value !== 'string') {
      throw new Error('Email must be a string')
    }
  }

  private readonly validateRegEx = (): void => {
    if (!this.regEx.test(this.value)) {
      throw new Error('Invalid email format')
    }
  }
}
