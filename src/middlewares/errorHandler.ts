import { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors/AppError'

export function errorHandler (error: Error, request: Request, response: Response, next: NextFunction) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      statusCode: error.statusCode,
      message: error.message
    })
  }

  console.log(error)

  return response.status(500).json({
    statusCode: 500,
    message: 'Internal server error.'
  })
}
