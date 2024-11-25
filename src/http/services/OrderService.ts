import { CreateOrderException } from '@/core/errors/CreateOrderException'
import { prismaClient } from '@/database/prisma'
import z from 'zod'

export const orderSchema = z.object({
  nome: z.string().optional(),
  mesa: z.coerce.number().positive('A mesa deve ser um número positivo'),
})

export const orderItemSchema = z.object({
  id_pedido: z.string().uuid('O id do pedido deve ser um uuid válido'),
  id_produto: z.string().uuid('O id do produto deve ser um uuid válido'),
  quantidade: z.coerce
    .number()
    .positive('A quantidade deve ser um número positivo'),
})

export type CreateOrderParams = z.infer<typeof orderSchema>

export type CreateOrderItemParams = z.infer<typeof orderItemSchema>

export async function createOrder({
  nome: name,
  mesa: table,
}: CreateOrderParams) {
  try {
    const order = await prismaClient.order.create({
      data: {
        table,
        name,
      },
    })

    return { order }
  } catch {
    throw new CreateOrderException()
  }
}

export async function addOrderItem({
  id_pedido: orderId,
  id_produto: productId,
  quantidade: quantity,
}: CreateOrderItemParams) {
  const orderItem = await prismaClient.orderItem.create({
    data: {
      orderId,
      productId,
      quantity,
    },
  })

  return { orderItem }
}

export async function removeOrderItem(orderItemId: string) {
  const orderItem = await prismaClient.orderItem.delete({
    where: {
      id: orderItemId,
    },
  })

  return { orderItem }
}

export async function sendOrder(orderId: string) {
  const item = await prismaClient.orderItem.findFirst({
    where: {
      orderId,
    },
  })

  if (!item) {
    throw new Error(
      'Não há itens no pedido, por tanto, não é possível enviá-lo.'
    )
  }

  const order = await prismaClient.order.update({
    where: {
      id: orderId,
    },
    data: {
      draft: false,
    },
  })

  return { order }
}

export async function finishOrder(orderId: string) {
  const order = await prismaClient.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: true,
    },
  })

  return { order }
}

export async function summaryOder(orderId: string) {
  const order = await prismaClient.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  })

  const total = order?.items.reduce((acc, item) => {
    return acc + item.quantity * Number(item.product.price)
  }, 0)

  return { ...order, total }
}

export async function deleteOrder(orderId: string) {
  const oder = await prismaClient.order.delete({
    where: {
      id: orderId,
    },
  })

  return { oder }
}
