import { NextFunction, Request, Response } from 'express'
import sendResponse from '../../shared/sendResponse'
import httpStatus from 'http-status'

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  return sendResponse(res, {
    statusCode: httpStatus.NOT_FOUND,
    success: false,
    message: 'Resource not found',
  })
  next()
}

export default notFoundHandler
