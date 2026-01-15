import app from '@/app'
import request from 'supertest'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import prisma from '@/shared/lib/prisma'
import { version as uuidVersion, validate as uuidValidate } from 'uuid'

const REGISTER_URL = '/api/user/auth/register'
// const LOGIN_URL = '/api/user/auth/login'

describe('AUTH', () => {
  const mock = {
    email: 'example@gmail.com',
    password: '12345678'
  }

  beforeAll(async () => {
    await prisma?.user.deleteMany()
  })

  describe('[POST] /register', () => {
    it('should register new user', async () => {
      // GIVEN
      const mockResult = {
        status: 'success',
        message: 'User registered successfully',
        code: 'USER_REGISTERED',
        data: {
          user: {
            id: expect.any(String),
            email: mock.email,
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
          },
          token: expect.any(String)
        }
      }
      // WHEN
      const { status, body } = await request(app).post(REGISTER_URL).send(mock)
      // THEN
      expect(status).toBe(201)
      expect(body).toEqual(mockResult)
      const data = body.data
      expect(uuidValidate(data.user.id)).toBe(true)
      expect((uuidVersion(data.user.id) === 4)).toBe(true)
      const decoded = jwt.verify(data.token, process.env.JWT_SECRET)
      expect(decoded).toEqual({
        id: data.user.id,
        email: data.user.email,
        exp: expect.any(Number),
        iat: expect.any(Number)
      })
      const newUser = await prisma.user.findUnique({ where: { email: mock.email } })
      expect(newUser).toMatchObject({ ...data.user, createdAt: new Date(data.user.createdAt), updatedAt: new Date(data.user.updatedAt) })
      if (newUser != null) {
        const result = await bcrypt.compare(mock.password, newUser.password)
        expect(result).toBe(true)
      }
    })

    it('should fail if user already registered', async () => {
      // GIVEN
      const mockResult = {
        status: 'fail',
        message: 'User already exist',
        code: 'USER_ALREADY_EXIST'
      }
      // WHEN
      const { status, body } = await request(app).post(REGISTER_URL).send(mock)
      // THEN
      expect(status).toBe(400)
      expect(body).toEqual(mockResult)
      const user = await prisma.user.findUnique({ where: { email: mock.email } })
      expect(user).not.toBeNull()
    })

    describe('DTOs validations', () => {
      describe('email', () => {
        it.each([
          { email: '' },
          { email: '   ' }
        ])('should fail if email is required when email is $email', async ({ email }) => {
          // GIVEN
          const mockResult = {
            status: 'fail',
            message: 'Email is required',
            code: 'EMAIL_REQUIRED'
          }
          // WHEN
          const { status, body } = await request(app).post(REGISTER_URL).send({ ...mock, email })
          // THEM
          expect(status).toBe(400)
          expect(body).toEqual(mockResult)
        })

        it.each([
          { email: 123 },
          { email: null },
          { email: undefined },
          { email: true },
          { email: false },
          { email: [] },
          { email: {} }
        ])('should validate email is a string when email is $email', async ({ email }) => {
          // GIVEN
          const mockResult = {
            status: 'fail',
            message: 'Email must be a string',
            code: 'INVALID_EMAIL_TYPE'
          }
          // WHEN
          const { status, body } = await request(app).post(REGISTER_URL).send({ ...mock, email })
          // THEM
          expect(status).toBe(400)
          expect(body).toEqual(mockResult)
        })

        it('should validate email format', async () => {
          // GIVEN
          const mockResult = {
            status: 'fail',
            message: 'Email format is invalid',
            code: 'INVALID_EMAIL_FORMAT'
          }
          // WHEN
          const { status, body } = await request(app).post(REGISTER_URL).send({ ...mock, email: 'invalid-format' })
          // THEM
          expect(status).toBe(400)
          expect(body).toEqual(mockResult)
        })
      })

      describe('password', () => {
        it.each([
          { password: '' },
          { password: '   ' }
        ])('should fail if password is required when password is $password', async ({ password }) => {
        // GIVEN
          const mockResult = {
            status: 'fail',
            message: 'Password is required',
            code: 'PASSWORD_REQUIRED'
          }
          // WHEN
          const { status, body } = await request(app).post(REGISTER_URL).send({ ...mock, password })
          // THEM
          expect(status).toBe(400)
          expect(body).toEqual(mockResult)
        })

        it.each([
          { password: 123 },
          { password: null },
          { password: undefined },
          { password: true },
          { password: false },
          { password: [] },
          { password: {} }
        ])('should validate password is a string when password is $password', async ({ password }) => {
        // GIVEN
          const mockResult = {
            status: 'fail',
            message: 'Password must be a string',
            code: 'INVALID_PASSWORD_TYPE'
          }
          // WHEN
          const { status, body } = await request(app).post(REGISTER_URL).send({ ...mock, password })
          // THEM
          expect(status).toBe(400)
          expect(body).toEqual(mockResult)
        })

        it('should validate password min length', async () => {
        // GIVEN
          const mockResult = {
            status: 'fail',
            message: 'Password must be at least 8 characters long',
            code: 'SHORT_PASSWORD'
          }
          // WHEN
          const { status, body } = await request(app).post(REGISTER_URL).send({ ...mock, password: '1234' })
          // THEM
          expect(status).toBe(400)
          expect(body).toEqual(mockResult)
        })

        it('should validate password max length', async () => {
        // GIVEN
          const mockResult = {
            status: 'fail',
            message: 'Password must be at most 64 characters long',
            code: 'LONG_PASSWORD'
          }
          // WHEN
          const { status, body } = await request(app).post(REGISTER_URL).send({ ...mock, password: 'a'.repeat(65) })
          // THEM
          expect(status).toBe(400)
          expect(body).toEqual(mockResult)
        })
      })
    })
  })

  // describe('[POST] login', () => {
  //   it('should login user', async () => {
  //     // GIVEN
  //     const mockResult = {
  //       status: 'success',
  //       message: 'User logged in successfully',
  //       code: 'USER_LOGGED_IN',
  //       data: {
  //         user: {
  //           id: expect.any(String),
  //           email: mock.email,
  //           createdAt: expect.any(String),
  //           updatedAt: expect.any(String)
  //         },
  //         token: expect.any(String)
  //       }
  //     }
  //     // WHEN
  //     const { status, body } = await request(app).post(LOGIN_URL).send(mock)
  //     // THEN
  //     expect(status).toBe(200)
  //     expect(body).toEqual(mockResult)
  //   })
  //   it('should fail if user does not exist', async () => {
  //     // GIVEN
  //     const mockResult = {
  //       status: 'fail',
  //       message: 'User not found',
  //       code: 'USER_NOT_FOUND'
  //     }
  //     // WHEN
  //     const { status, body } = await request(app).post(LOGIN_URL).send({ ...mock, email: 'wrong@email.com' })
  //     // THEN
  //     expect(status).toBe(400)
  //     expect(body).toEqual(mockResult)
  //   })

  //   describe('DTOs validations', () => {
  //     describe('email', () => {
  //       it.each([
  //         { email: '' },
  //         { email: '   ' }
  //       ])('should fail if email is required when email is $email', async ({ email }) => {
  //         // GIVEN
  //         const mockResult = {
  //           status: 'fail',
  //           message: 'Email is required',
  //           code: 'EMAIL_REQUIRED'
  //         }
  //         // WHEN
  //         const { status, body } = await request(app).post(LOGIN_URL).send({ ...mock, email })
  //         // THEM
  //         expect(status).toBe(400)
  //         expect(body).toEqual(mockResult)
  //       })
  //       it.each([
  //         { email: 123 },
  //         { email: null },
  //         { email: undefined },
  //         { email: true },
  //         { email: false },
  //         { email: [] },
  //         { email: {} }
  //       ])('should validate email is a string when email is $email', async ({ email }) => {
  //         // GIVEN
  //         const mockResult = {
  //           status: 'fail',
  //           message: 'Email must be a string',
  //           code: 'INVALID_EMAIL_TYPE'
  //         }
  //         // WHEN
  //         const { status, body } = await request(app).post(LOGIN_URL).send({ ...mock, email })
  //         // THEM
  //         expect(status).toBe(400)
  //         expect(body).toEqual(mockResult)
  //       })
  //       it('should validate email format', async () => {
  //         // GIVEN
  //         const mockResult = {
  //           status: 'fail',
  //           message: 'Invalid email format',
  //           code: 'INVALID_EMAIL_FORMAT'
  //         }
  //         // WHEN
  //         const { status, body } = await request(app).post(LOGIN_URL).send({ ...mock, email: 'invalid-format' })
  //         // THEM
  //         expect(status).toBe(400)
  //         expect(body).toEqual(mockResult)
  //       })
  //     })

//     describe('password', () => {
//       it.each([
//         { password: '' },
//         { password: '   ' }
//       ])('should fail if password is required when password is $password', async ({ password }) => {
//         // GIVEN
//         const mockResult = {
//           status: 'fail',
//           message: 'Password is required',
//           code: 'PASSWORD_REQUIRED'
//         }
//         // WHEN
//         const { status, body } = await request(app).post(LOGIN_URL).send({ ...mock, password })
//         // THEM
//         expect(status).toBe(400)
//         expect(body).toEqual(mockResult)
//       })
//       it.each([
//         { password: 123 },
//         { password: null },
//         { password: undefined },
//         { password: true },
//         { password: false },
//         { password: [] },
//         { password: {} }
//       ])('should validate password is a string when password is $password', async ({ password }) => {
//         // GIVEN
//         const mockResult = {
//           status: 'fail',
//           message: 'Password must be a string',
//           code: 'INVALID_PASSWORD_TYPE'
//         }
//         // WHEN
//         const { status, body } = await request(app).post(LOGIN_URL).send({ ...mock, password })
//         // THEM
//         expect(status).toBe(400)
//         expect(body).toEqual(mockResult)
//       })
//       it('should validate password min length', async () => {
//         // GIVEN
//         const mockResult = {
//           status: 'fail',
//           message: 'Password must be at least 8 characters long',
//           code: 'SHORT_PASSWORD'
//         }
//         // WHEN
//         const { status, body } = await request(app).post(LOGIN_URL).send({ ...mock, password: '1234' })
//         // THEM
//         expect(status).toBe(400)
//         expect(body).toEqual(mockResult)
//       })
//       it('should validate password max length', async () => {
//         // GIVEN
//         const mockResult = {
//           status: 'fail',
//           message: 'Password must be at most 64 characters long',
//           code: 'LONG_PASSWORD'
//         }
//         // WHEN
//         const { status, body } = await request(app).post(LOGIN_URL).send({ ...mock, password: 'a'.repeat(65) })
//         // THEM
//         expect(status).toBe(400)
//         expect(body).toEqual(mockResult)
//       })
//     })
//   })
// })
})
