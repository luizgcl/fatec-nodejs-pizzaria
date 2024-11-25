import type { Request, Response, Router } from 'express'
import multer from 'multer'
import multerConfig from '../../storage/multer'
import { handleAuthentication } from '../middleware/AuthMiddleware'
import * as ProductService from '../services/ProductService'

export function bootstrap(router: Router) {
  const upload = multer(multerConfig.upload('./storage/public'))

  router.post(
    '/product',
    handleAuthentication,
    upload.single('file'),
    async (req: Request, res: Response) => {
      if (!req.file) {
        throw new Error('Erro no upload da imagem!')
      }

      const { originalname, filename: banner } = req.file

      const { product: response } = await ProductService.createProduct({
        ...req.body,
        banner,
      })

      return res.json(response)
    }
  )

  router.get(
    '/category/product',
    handleAuthentication,
    async (req: Request, res: Response) => {
      const categoryId = req.query.id_categoria as string
      const { products: response } =
        await ProductService.listProducts(categoryId)

      return res.json(response)
    }
  )

  return router
}
