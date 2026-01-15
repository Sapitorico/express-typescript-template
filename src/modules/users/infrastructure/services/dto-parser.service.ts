import { loginSchema } from '@/modules/users/infrastructure/schemas/login.schema'
import { registerSchema, IUserRegister } from '@/modules/users/infrastructure/schemas/register.schema'
import { getValidationError } from '@/modules/users/infrastructure/utils/get-validation-error'
import { BadRequest } from '@/shared/http-error'
import { ZodError } from 'zod'

export class DtoParser {
  register = async (inputData: IUserRegister): Promise<IUserRegister> => {
    const { data, error } = await registerSchema.safeParseAsync(inputData)
    if (error != null) {
      this.parseZodError(error)
      throw error
    }
    return data
  }

  login = async (inputData: IUserRegister): Promise<IUserRegister> => {
    const { data, error } = await loginSchema.safeParseAsync(inputData)
    if (error != null) {
      this.parseZodError(error)
      throw error
    }
    return data
  }

  private readonly parseZodError = (error: ZodError): void => {
    const issue = error.issues[0]
    if (issue !== undefined) {
      const errorCode = issue.message
      throw new BadRequest({ code: errorCode, message: getValidationError(errorCode) })
    }
  }
}
