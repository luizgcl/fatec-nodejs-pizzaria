import { CreateOrderException } from '@/core/errors/CreateOrderException'
import { prismaClient } from '@/database/prisma'
import z from 'zod'

export const orderSchema = z.object({
  nome: z.string().optional(),
  mesa: z.coerce.number().positive('A mesa deve ser um número positivo'),
})

export type CreateOrderParams = z.infer<typeof orderSchema>

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
