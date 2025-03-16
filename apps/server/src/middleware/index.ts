import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application } from 'express'
// import { limiter } from './app/middlewares/rateLimit'

const applyMiddlewares = (app: Application) => {
  app.use(cors())
  app.use(cookieParser())
  // app.use(limiter(1, 2))

  //parser
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use(express.static('public'))
}

export default applyMiddlewares
