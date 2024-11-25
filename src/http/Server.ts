import { env } from '@/env/Env'
import * as AuthController from '@/http/controllers/AuthController'
import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import path from 'node:path'
import { handleError } from './middleware/ErrorHandler'

export function startServer() {
  const app = express()
  const router = express.Router()

  app.use(express.json())
  app.use(
    cors({
      origin: '*',
    })
  )

  app.use('/auth', AuthController.bootstrap(router))

  app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', '..', 'storage', 'public'))
  )

  app.use(handleError)

  app.listen(env.PORT, () => {
    console.log('Server HTTP is running!')
  })
}
