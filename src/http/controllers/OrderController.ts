import type { Request, Response, Router } from 'express'
import { handleAuthentication } from '../middleware/AuthMiddleware'
import * as OrderService from '../services/OrderService'

export function bootstrap(router: Router) {
  router.post(
    '/',
    handleAuthentication,
    async (req: Request, res: Response) => {
      const { order: response } = await OrderService.createOrder(req.body)

      return res.json(response)
    }
  )

  router.delete(
    '/delete',
    handleAuthentication,
    async (req: Request, res: Response) => {
      const orderId = req.query.id_pedido as string

      const { oder: response } = await OrderService.deleteOrder(orderId)

      return res.json(response)
    }
  )

  router.post(
    '/add',
    handleAuthentication,
    async (req: Request, res: Response) => {
      const { orderItem: response } = await OrderService.addOrderItem(req.body)

      return res.json(response)
    }
  )

  router.delete(
    '/remove',
    handleAuthentication,
    async (req: Request, res: Response) => {
      const orderItemId = req.query.item_id as string
      const { orderItem: response } =
        await OrderService.removeOrderItem(orderItemId)

      return res.json(response)
    }
  )

  router.put(
    '/send',
    handleAuthentication,
    async (req: Request, res: Response) => {
      const orderId = req.query.id_pedido as string
      const { order } = await OrderService.sendOrder(orderId)

      return res.json({ orderId: order.id })
    }
  )

  router.put(
    '/finish',
    handleAuthentication,
    async (req: Request, res: Response) => {
      const orderId = req.query.id_pedido as string
      const { order } = await OrderService.finishOrder(orderId)

      return res.json({ orderId: order.id })
    }
  )

  router.get(
    '/summary',
    handleAuthentication,
    async (req: Request, res: Response) => {}
  )

  return router
}
