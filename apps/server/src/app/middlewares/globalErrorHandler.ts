/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/error.interface'
import handleValidationError from '../../errors/handleValidationError'
import ApiError from '../../errors/ApiError'
import { ZodError } from 'zod'
import handleZodError from '../../errors/handleZodError'
import handleCastError from '../../errors/handleCastError'
import { logger } from '../../shared/logger'

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!error) {
    next()
  }
 

  config.env === 'development'
    ? console.log(`🐱‍🏍 globalErrorHandler ~~`, { error })
    : logger.error(`🐱‍🏍 globalErrorHandler ~~`, error)

  let statusCode = 500
  let message = 'Something went wrong !'
  let errorMessages: IGenericErrorMessage[] = []

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error.name === 'CastError') {
    const simplifiedError = handleCastError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    errorMessages: errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
}

export default globalErrorHandler
