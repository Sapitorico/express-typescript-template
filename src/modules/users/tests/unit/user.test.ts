import { User, IUserData } from '@/modules/users/domain/entities/user.entity'

describe('User (Domain) ', () => {
  const mock: IUserData = {
    id: '123',
    email: 'example@example.com',
    password: '12345678',
    createdAt: new Date('2025-09-22T23:53:25.927Z'),
    updatedAt: new Date('2025-09-22T23:53:25.927Z')
  }

  describe('Constructor', () => {
    // GIVEN
    it('should instantiate user', () => {
      const user = new User(mock)
      // THEN
      expect(user.toObject()).toEqual(mock)
    })

    it('should auto generated id when not provided', () => {
      // GIVEN
      const { id, ...rest } = mock
      // WHEN
      const user = new User(rest)
      // THEN
      expect(user.toObject()).toHaveProperty('id')
    })

    it('should auto generated timestamps when not provided', () => {
      // GIVEN
      const { createdAt, updatedAt, ...rest } = mock
      // WHEN
      const user = new User(rest)
      // THEN
      const userData = user.toObject()
      expect(userData).toHaveProperty('createdAt')
      expect(userData).toHaveProperty('updatedAt')
    })
  })

  describe('Email validation', () => {
    it.each([
      { email: '' },
      { email: null },
      { email: undefined }
    ])('should validate email is required when email is $email', ({ email }) => {
      // GIVEN
      const mockResult = 'Email is required'
      // WHEN
      const createUser = (): User => new User({ email, password: '12345678' } as any)
      // THEN
      expect(createUser).toThrow(mockResult)
    })

    it('should validate email is a string', () => {
      // GIVEN
      const mockResult = 'Email must be a string'
      // WHEN
      const createUser = (): User => new User({ email: 123, password: '12345678' } as any)
      // THEN
      expect(createUser).toThrow(mockResult)
    })

    it('should validate email format', () => {
      // GIVEN
      const mockResult = 'Invalid email format'
      // WHEN
      const createUser = (): User => new User({ email: 'invalid-email', password: '12345678' })
      // THEN
      expect(createUser).toThrow(mockResult)
    })
  })

  describe('Password Validation', () => {
    it.each([
      { password: '' },
      { password: null },
      { password: undefined }
    ])('should validate password is required when password is $password', ({ password }) => {
      // GIVEN
      const mockResult = 'Password is required'
      // WHEN
      const createUser = (): User => new User({ email: mock.email, password } as any)
      // THEN
      expect(createUser).toThrow(mockResult)
    })

    it('should validate password is a string', () => {
      // GIVEN
      const mockResult = 'Password must be a string'
      // WHEN
      const createUser = (): User => new User({ email: mock.email, password: 123 } as any)
      // THEN
      expect(createUser).toThrow(mockResult)
    })

    it('should validate password is to long', () => {
      // GIVEN
      const mockResult = 'Password must be at most 64 characters long'
      // WHEN
      const createUser = (): User => new User({ email: mock.email, password: 'a'.repeat(65) })
      // THEN
      expect(createUser).toThrow(mockResult)
    })

    it('should validate password is too short', () => {
      // GIVEN
      const mockResult = 'Password must be at least 8 characters long'
      // WHEN
      const createUser = (): User => new User({ email: mock.email, password: '1234' })
      // THEN
      expect(createUser).toThrow(mockResult)
    })
  })
})
