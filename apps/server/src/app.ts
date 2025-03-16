import express, { Application, Request, Response } from 'express'
import path from 'path'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFoundHandler from './app/middlewares/notFoundHandler'
import { RootRoutes } from './app/routes'
import applyMiddlewares from './middleware'

const app: Application = express()
applyMiddlewares(app)

//api-spec-docs
const yamlFilePath = path.join(__dirname, '../swagger.yaml')
const swaggerDocument = YAML.load(yamlFilePath)

//health
app.get('/', (_req: Request, res: Response) => {
  res.redirect('/health')
})
//health
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    health: 'OK',
  })
})

app.use('/docs/api/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api/v1', RootRoutes)

//global error handler
app.use(globalErrorHandler)

//not found handler
app.use(notFoundHandler)

export default app
