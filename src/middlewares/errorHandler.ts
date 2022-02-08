import { isCelebrateError } from 'celebrate'
import { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors/AppError'

type ErrorMessages = {
  field: string;
  error: string
}

export function errorHandler (error: Error, request: Request, response: Response, next: NextFunction) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      statusCode: error.statusCode,
      message: error.message
    })
  }

  if (isCelebrateError(error)) {
    const messages = [] as ErrorMessages[]

    for (const [, joiError] of error.details.entries()) {
      joiError.details.forEach((detail) => {
        messages.push({
          error: detail.message,
          field: String(detail.path[0])
        })
      })
    }

    return response.status(400).json({
      statusCode: 400,
      key: 'validation.failed',
      messages
    })
  }

  console.log(error)

  return response.status(500).json({
    statusCode: 500,
    message: 'Internal server error.'
  })
}
