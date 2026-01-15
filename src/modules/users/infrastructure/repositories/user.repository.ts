
import { User } from '@/modules/users/domain/entities/user.entity'
import { IUserRepository } from '@/modules/users/domain/ports/user-repository.port'
import { Conflict, NotFound } from '@/shared/http-error'
import { catchErrorAsync } from '@/shared/utils/catch-error'
import { Prisma, PrismaClient } from '@prisma/client'

export class UserRepository implements IUserRepository {
  constructor (private readonly dbClient: PrismaClient) {}

  saveUser = async (email: string, password: string): Promise<User> => {
    const newUser = User.create(email, password)

    const createUser = this.dbClient.user.create({
      data: newUser.toPrivateDTO()
    })

    const [createdUser, error] = await catchErrorAsync(createUser)

    if (error != null) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Conflict({ code: 'USER_ALREADY_EXIST', message: 'User already exist' })
        }
      }
      throw error
    }

    const mappedUser = new User(createdUser)
    return mappedUser
  }

  getUserByEmail = async (email: string): Promise<User> => {
    const user = await this.dbClient.user.findUnique({
      where: {
        email
      }
    })

    if (user == null) {
      throw new NotFound({ code: 'USER_NOT_FOUND', message: 'User not found' })
    }

    const mappedUser = new User(user)
    return mappedUser
  }

  getUserById = async (id: string): Promise<User> => {
    const user = await this.dbClient.user.findUnique({
      where: {
        id
      }
    })
    if (user == null) {
      throw new NotFound({ code: 'USER_NOT_FOUND', message: 'User not found' })
    }

    const mappedUser = new User(user)
    return mappedUser
  }
}
