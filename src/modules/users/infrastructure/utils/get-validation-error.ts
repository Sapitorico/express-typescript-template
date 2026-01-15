import { TypeWhithKey } from '@/shared/models/type-whith-key'

export const getValidationError = (errorCode: string): string => {
  const codeMatcher: TypeWhithKey<string> = {
    EMAIL_REQUIRED: 'Email is required',
    INVALID_EMAIL_TYPE: 'Email must be a string',
    INVALID_EMAIL_FORMAT: 'Email format is invalid',
    PASSWORD_REQUIRED: 'Password is required',
    INVALID_PASSWORD_TYPE: 'Password must be a string',
    SHORT_PASSWORD: 'Password must be at least 8 characters long',
    LONG_PASSWORD: 'Password must be at most 64 characters long',
    USER_ALREADY_EXIST: 'User already exist'
  }

  return codeMatcher[errorCode] ?? 'Something went wrong'
}
