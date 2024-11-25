import { CreateProductException } from '@/core/errors/CreateProductException'
import { prismaClient } from '@/database/prisma'
import z from 'zod'

export const productSchema = z.object({
  name: z
    .string()
    .min(3, 'O nome do produto deve conter no mínimo 3 caracteres'),
  price: z.number().positive('O preço deve ser um número positivo'),
  banner: z.string(),
  categoryId: z.string().uuid('Id de categoria inválido'),
})

export type CreateProductParams = z.infer<typeof productSchema>

export async function createProduct(data: CreateProductParams) {
  try {
    const product = await prismaClient.product.create({
      data,
    })

    return { product }
  } catch {
    throw new CreateProductException()
  }
}

export async function listProducts(categoryId?: string) {
  const products = await prismaClient.product.findMany({
    where: {
      categoryId,
    },
  })

  return {
    products,
  }
}
