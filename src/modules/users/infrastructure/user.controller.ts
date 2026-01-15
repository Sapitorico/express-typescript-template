import { IUserUseCases } from '@/modules/users/domain/ports/user-usecases.port'
import { DtoParser } from '@/modules/users/infrastructure/services/dto-parser.service'
import { Unauthorized } from '@/shared/http-error'
import { Request, Response } from 'express'

export class UserController {
  constructor (
    private readonly userUseCases: IUserUseCases,
    private readonly dtoParser: DtoParser
  ) { }

  register = async (req: Request, res: Response): Promise<void> => {
    const data = await this.dtoParser.register(req.body)
    const resData = await this.userUseCases.registerUser(data.email, data.password)
    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      code: 'USER_REGISTERED',
      data: resData
    })
  }

  login = async (req: Request, res: Response): Promise<void> => {
    const data = await this.dtoParser.login(req.body)
    const resData = await this.userUseCases.loginUser(data.email, data.password)
    res.status(200).json({
      status: 'success',
      message: 'User logged in successfully',
      code: 'USER_LOGGED_IN',
      data: resData
    })
  }

  me = async (req: Request, res: Response): Promise<void> => {
    if (req.user == null) throw new Unauthorized({ code: 'USER_NOT_AUTHENTICATED', message: 'User not authenticated' })
    const user = await this.userUseCases.getUserProfile(req.user.id)
    res.status(200).json({
      status: 'success',
      message: 'User profile fetched successfully',
      code: 'USER_PROFILE_FETCHED',
      data: user
    })
  }
}
