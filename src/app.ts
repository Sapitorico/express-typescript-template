import express, { json } from 'express'
import cors from 'cors'
import compression from 'compression'
import swaggerUi from 'swagger-ui-express'
import { corsOptionsDelegate } from './config/cors.config'
import logger from './shared/lib/logger'
import { logErrors } from './shared/middlewares/log-errors.middleware'
import { errorHandler } from './shared/middlewares/error-hanlder.middleware'
import { specs } from './config/swagger.config'
import router from './router'
import './config/env.config'

const app = express()

app.set('trust proxy', true) // habilita el trust proxy para poder acceder a la dirección IP real del cliente
app.use(json()) // middleware que transforma el req.body en un objeto json
app.use(cors(corsOptionsDelegate)) // middleware que habilita el cors
app.use(compression())
app.use(logger)

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs)) // ruta para acceder a la documentacion de la api
app.use('/api', router)

app.get('/', (_, res) => {
  res.status(200).json('sapo api')
})

app.use(logErrors)
app.use(errorHandler)

export default app
