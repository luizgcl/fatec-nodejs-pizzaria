import type { Request, Response, Router } from 'express'
import { handleAuthentication } from '../middleware/AuthMiddleware'
import * as CategoryService from '../services/CategoryService'

export function bootstrap(router: Router) {
  router.post(
    '/category',
    handleAuthentication,
    async (req: Request, res: Response) => {
      const { category: response } = await CategoryService.createCategory(
        req.body
      )

      return res.json(response)
    }
  )

  router.get(
    '/categories',
    handleAuthentication,
    async (req: Request, res: Response) => {
      const { categories: response } = await CategoryService.listCategories()

      return res.json(response)
    }
  )

  return router
}
