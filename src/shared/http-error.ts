export class HttpError extends Error {
  status: string
  statusCode: number
  code: string

  constructor (statusCode: number, status: string, code: string, message: string) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
    this.status = status
    this.code = code
    Error.captureStackTrace(this, this.constructor)
  }

  toJSON (): { status: string, code: string, message: string } {
    return {
      status: this.status,
      code: this.code,
      message: this.message
    }
  }
}

export class BadRequest extends HttpError {
  constructor ({ code = 'BAD_REQUEST', message = 'Bad Request' }) {
    super(400, 'fail', code, message)
  }
}

export class Unauthorized extends HttpError {
  constructor ({ code = 'UNAUTHORIZED', message = 'Unauthorized' }) {
    super(401, 'fail', code, message)
  }
}

export class NotFound extends HttpError {
  constructor ({ code = 'NOT_FOUND', message = 'Not Found' }) {
    super(404, 'fail', code, message)
  }
}

export class InternalServer extends HttpError {
  constructor ({ code = 'INTERNAL_SERVER_ERROR', message = 'Internal Server Error' }) {
    super(500, 'error', code, message)
  }
}
