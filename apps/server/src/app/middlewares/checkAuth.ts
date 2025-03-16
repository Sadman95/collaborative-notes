import { NextFunction, Request, Response } from 'express'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'
import { JwtHelpers } from '../../helpers/jwtHelpers'
import config from '../../config'
import { Secret } from 'jsonwebtoken'

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const { refresh_token, access_token } = req.cookies
      const accessToken =
        req.headers.authorization?.split(' ')[1] || access_token

      const token = refresh_token || accessToken
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You aren't authorized")
      }
      let verifiedUser = null
      const secret =
        token === refresh_token
          ? config.jwt.jwt_refresh_secret
          : config.jwt.jwt_secret
      
      verifiedUser = JwtHelpers.verifyToken(token, secret as Secret)

      if (!verifiedUser) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You aren't authorized")
      }

      req.user = verifiedUser

      next()
    } catch (error) {
      next(error)
    }
  }

export default checkAuth;
