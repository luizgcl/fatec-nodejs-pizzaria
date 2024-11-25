import { HttpStatus } from '@/core/constants/HttpStatus'
import type { Request, Response, Router } from 'express'
import * as AuthService from '../services/AuthService'

export function bootstrap(router: Router) {
  router.post('/register', async (req: Request, res: Response) => {
    await AuthService.handleRegister(req.body)
    return res.status(HttpStatus.CREATED).send()
  })

  router.post('/login', async (req: Request, res: Response) => {
    const response = await AuthService.handleLogin(req.body)

    return res.json(response)
  })

  return router
}
