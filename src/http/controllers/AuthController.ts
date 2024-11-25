import { HttpStatus } from '@/core/constants/HttpStatus'
import type { Request, Response, Router } from 'express'
import { handleAuthentication } from '../middleware/AuthMiddleware'
import * as AuthService from '../services/AuthService'

export function bootstrap(router: Router) {
  router.post('/user', async (req: Request, res: Response) => {
    const user = await AuthService.handleRegister(req.body)
    return res.status(HttpStatus.CREATED).send(user)
  })

  router.post('/session', async (req: Request, res: Response) => {
    const response = await AuthService.handleLogin(req.body)

    return res.json(response)
  })

  router.get(
    '/userInfo',
    handleAuthentication,
    async (req: Request, res: Response) => {
      const response = await AuthService.handleShowUserInfo(req.userId)

      return res.json(response)
    }
  )

  return router
}
